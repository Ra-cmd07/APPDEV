export default function Button({ label, onClick, variant = 'primary', disabled = false, type = 'button' }) {
  const base =
    'px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 border-0',
    secondary:
      'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:-translate-y-0.5',
    success:
      'bg-green-600 text-white hover:bg-green-700 hover:-translate-y-0.5 shadow-md hover:shadow-lg border-0',
    danger:
      'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 hover:-translate-y-0.5',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary}`}
    >
      {label}
    </button>
  )
}
