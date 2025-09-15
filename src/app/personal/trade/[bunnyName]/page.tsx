export default function Trade({ params }: {
  params: { bunnyName: string }
}) {
  return (
    <div>
      <p>ID: {params.bunnyName}</p>
    </div>
  )
}
