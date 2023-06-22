import "client-only";

export const openFullscreen = async () => {
  if (document?.documentElement?.requestFullscreen)
    return document.documentElement.requestFullscreen();

  if ((document?.documentElement as any)?.webkitRequestFullscreen)
    return (document.documentElement as any)?.webkitRequestFullscreen();

  if ((document?.documentElement as any)?.msRequestFullscreen)
    return (document.documentElement as any)?.msRequestFullscreen();
};

export const closeFullscreen = async () => {
  if (document?.exitFullscreen) return document.exitFullscreen();

  if ((document as any)?.webkitExitFullscreen)
    return (document as any).webkitExitFullscreen();

  if ((document as any)?.msExitFullscreen)
    return (document as any).msExitFullscreen();

  console.warn("Unsupported browser");
};
