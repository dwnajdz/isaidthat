'use client'

export function DeleteButton({
  deleteHref,
  text = "Delete",
  confirmText = "Are you sure?"
}: {
  deleteHref: string,
  text?: string,
  confirmText?: string,
}) {
  return (
    <a
      className="text-red-600 hover:text-red-600 text-2xl md:text-xl p-2 rounded-md text-center mb-4 hover:underline w-1/4 border border-red-600 ml-6"
      href={deleteHref}
      onClick={(e) => {
        const canDelete = confirm(confirmText);
        if (!canDelete) {
          e.preventDefault();
        }
      }}
    >
      {text}
    </a>
  )
}