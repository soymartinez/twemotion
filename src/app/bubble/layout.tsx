export default function BubbleLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <main className='flex justify-center items-center min-w-[100vw] min-h-screen'>
            {children}
        </main>
    )
}
