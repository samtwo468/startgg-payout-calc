export const metadata = {
  title: 'smashcalc',
  description: 'Generate prize payouts for start.gg tournaments',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
