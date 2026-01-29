export const dynamic = 'force-static';

export default function manifest() {
  return {
    name: 'FleetProTax',
    short_name: 'FleetProTax',
    description: 'App zur Erfassung von steuerlichen Ausgaben für Kuriere',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
