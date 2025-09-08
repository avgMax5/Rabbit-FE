export default function Trade({ params }: {
  params: { bunny_id: string }
}) {
  return (
    <div>
      <p>ID: {params.bunny_id}</p>
    </div>
  )
}
