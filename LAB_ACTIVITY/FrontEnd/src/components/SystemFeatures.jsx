// FeatureCard — displays one system feature from the StockTrack proposal
export function FeatureCard({ icon, title, description, badge }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col gap-3 border border-gray-100">
      <div className="text-4xl">{icon}</div>
      <div className="flex items-center gap-2">
        <h3 className="text-blue-900 font-bold text-lg leading-snug">{title}</h3>
        {badge && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
            {badge}
          </span>
        )}
      </div>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

// SystemFeatures — displays all 3+ features in a responsive grid
export default function SystemFeatures() {
  const features = [
    {
      icon: '📦',
      title: 'Product Inventory',
      description:
        'Add, edit, and delete products with real-time quantity tracking, SKU management, and automatic stock status updates.',
      badge: 'Core',
    },
    {
      icon: '📊',
      title: 'Inventory Reports',
      description:
        'Generate summary, detailed, and alert reports. Analyze inventory value by category and identify items needing reorder.',
      badge: 'Analytics',
    },
    {
      icon: '📥',
      title: 'Stock Movement',
      description:
        'Track all incoming and outgoing stock movements with date, reference numbers, and full movement history logs.',
      badge: 'Tracking',
    },
    {
      icon: '🔍',
      title: 'Smart Search',
      description:
        'Instantly filter products by name or SKU. Quickly locate any item across your entire inventory in real time.',
      badge: 'Search',
    },
    {
      icon: '⚠️',
      title: 'Stock Alerts',
      description:
        'Automatic status tagging for In Stock, Low Stock, and Out of Stock items to keep your team always informed.',
      badge: 'Alerts',
    },
    {
      icon: '🔐',
      title: 'User Authentication',
      description:
        'Secure login and sign-up system with localStorage-based account management and optional remember-me support.',
      badge: 'Security',
    },
  ]

  return (
    <section className="py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">System Features</h2>
          <p className="text-gray-500 text-sm">Everything StockTrack offers to manage your inventory</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
