/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ParsedVideoInfo {
  embedUrl: string;
  thumbnailUrl?: string;
  isDirect: boolean;
  platform: 'youtube' | 'vimeo' | 'direct' | 'other';
  videoId?: string;
}

/**
 * Converts any YouTube / Vimeo / Direct video link into a playable iframe embed URL
 * Supports standard URLs, youtu.be, youtube shorts, embed URLs, and Vimeo.
 */
export function parseVideoUrl(url: string | undefined): ParsedVideoInfo {
  if (!url || typeof url !== 'string') {
    return {
      embedUrl: '',
      isDirect: false,
      platform: 'other',
    };
  }

  const cleanUrl = url.trim();

  // YouTube Shorts
  const shortsMatch = cleanUrl.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/i);
  if (shortsMatch && shortsMatch[1]) {
    const videoId = shortsMatch[1];
    return {
      embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      isDirect: false,
      platform: 'youtube',
      videoId,
    };
  }

  // YouTube standard watch
  const watchMatch = cleanUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (watchMatch && watchMatch[1]) {
    const videoId = watchMatch[1];
    return {
      embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      isDirect: false,
      platform: 'youtube',
      videoId,
    };
  }

  // Vimeo
  const vimeoMatch = cleanUrl.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    const videoId = vimeoMatch[1];
    return {
      embedUrl: `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`,
      isDirect: false,
      platform: 'vimeo',
      videoId,
    };
  }

  // Direct MP4/WebM/Ogg file
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(cleanUrl)) {
    return {
      embedUrl: cleanUrl,
      isDirect: true,
      platform: 'direct',
    };
  }

  // Already an embed iframe URL
  if (cleanUrl.includes('youtube.com/embed/') || cleanUrl.includes('player.vimeo.com/video/')) {
    return {
      embedUrl: cleanUrl,
      isDirect: false,
      platform: cleanUrl.includes('youtube.com') ? 'youtube' : 'vimeo',
    };
  }

  return {
    embedUrl: cleanUrl,
    isDirect: false,
    platform: 'other',
  };
}
