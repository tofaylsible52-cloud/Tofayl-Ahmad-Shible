/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Normalizes and extracts clean direct image URLs from common hosting platforms,
 * Markdown snippets, HTML img tags, Google Drive, Dropbox, Imgur, etc.
 */
export function normalizeImageUrl(input: string): string {
  if (!input) return '';
  let url = input.trim();

  // 1. If user pasted markdown [![alt](url)](link) or ![alt](url)
  const markdownMatch = url.match(/!\[.*?\]\((https?:\/\/[^\s\)]+)\)/);
  if (markdownMatch && markdownMatch[1]) {
    url = markdownMatch[1];
  }

  // 2. If user pasted HTML <img src="url" ...>
  const htmlMatch = url.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
  if (htmlMatch && htmlMatch[1]) {
    url = htmlMatch[1];
  }

  // 3. Google Drive Share URL: https://drive.google.com/file/d/FILE_ID/view...
  const gDriveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gDriveMatch && gDriveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${gDriveMatch[1]}`;
  }

  // 4. Dropbox: change ?dl=0 to ?raw=1
  if (url.includes('dropbox.com')) {
    return url.replace(/[?&]dl=0/, '?raw=1').replace(/[?&]dl=1/, '?raw=1');
  }

  // 5. Imgur page: https://imgur.com/aBcDeFg -> https://i.imgur.com/aBcDeFg.jpg
  const imgurMatch = url.match(/^https?:\/\/(?:www\.)?imgur\.com\/([a-zA-Z0-9]{5,8})$/);
  if (imgurMatch && imgurMatch[1]) {
    return `https://i.imgur.com/${imgurMatch[1]}.jpg`;
  }

  return url;
}

/**
 * Checks if a URL looks like a Postimages webpage link rather than a direct image link.
 * e.g., https://postimg.cc/68bZ5Y6B vs https://i.postimg.cc/68bZ5Y6B/photo.jpg
 */
export function isPostimagesPageUrl(url: string): boolean {
  if (!url) return false;
  return (
    /https?:\/\/(?:www\.)?postimg\.cc\/(?!.*(?:\.jpg|\.jpeg|\.png|\.webp|\.gif))/i.test(url) &&
    !url.includes('i.postimg.cc')
  );
}

/**
 * Checks if a URL looks like an ImgBB webpage link rather than a direct image link.
 * e.g., https://ibb.co/abcdef vs https://i.ibb.co/abcdef/photo.jpg
 */
export function isImgbbPageUrl(url: string): boolean {
  if (!url) return false;
  return /https?:\/\/(?:www\.)?ibb\.co\/[a-zA-Z0-9]+/i.test(url) && !url.includes('i.ibb.co');
}

/**
 * Automatically resolves indirect/webpage links (like https://postimg.cc/68bZ5Y6B)
 * to their direct image file URL by querying public resolver or extracting page metadata.
 */
export async function autoResolveImageUrl(inputUrl: string): Promise<string> {
  const normalized = normalizeImageUrl(inputUrl);
  if (!normalized) return '';

  // If already ends in typical image extension or is data URL, return
  if (
    normalized.startsWith('data:image/') ||
    /\.(jpeg|jpg|png|webp|gif|svg|avif)(\?.*)?$/i.test(normalized) ||
    normalized.includes('i.postimg.cc/') ||
    normalized.includes('i.ibb.co/')
  ) {
    return normalized;
  }

  // Postimages Webpage URL Resolution (e.g. https://postimg.cc/68bZ5Y6B)
  if (normalized.includes('postimg.cc/')) {
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(normalized)}`;
      const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const html = await res.text();
        const ogImage = html.match(/<meta property=["']og:image["'] content=["']([^"']+)["']/i);
        if (ogImage && ogImage[1]) {
          return ogImage[1];
        }
        const mainImg = html.match(/<img[^>]+id=["']main-image["'][^>]+src=["']([^"']+)["']/i);
        if (mainImg && mainImg[1]) {
          return mainImg[1];
        }
        const directMatch = html.match(/https:\/\/i\.postimg\.cc\/[a-zA-Z0-9_\-]+\/[a-zA-Z0-9_\-\.]+/i);
        if (directMatch && directMatch[0]) {
          return directMatch[0];
        }
      }
    } catch (e) {
      console.warn('Postimages auto-resolve attempt timed out or failed, returning normalized URL', e);
    }
  }

  // ImgBB Webpage URL Resolution (e.g. https://ibb.co/68bZ5Y)
  if (normalized.includes('ibb.co/')) {
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(normalized)}`;
      const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const html = await res.text();
        const ogImage = html.match(/<meta property=["']og:image["'] content=["']([^"']+)["']/i);
        if (ogImage && ogImage[1]) {
          return ogImage[1];
        }
        const directMatch = html.match(/https:\/\/i\.ibb\.co\/[a-zA-Z0-9_\-]+\/[a-zA-Z0-9_\-\.]+/i);
        if (directMatch && directMatch[0]) {
          return directMatch[0];
        }
      }
    } catch (e) {
      console.warn('ImgBB auto-resolve failed:', e);
    }
  }

  return normalized;
}
