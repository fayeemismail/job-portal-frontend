export default function BlogPage() {
  const dummyPosts = [
    {
      id: 1,
      title: '5 Common Plumbing Mistakes to Avoid',
      date: 'July 1, 2026',
      author: 'John Doe',
      excerpt:
        'Learn how to prevent costly leaks and damage by avoiding these standard household plumbing errors.',
    },
    {
      id: 2,
      title: 'Essential Home Maintenance Checklist for Summer',
      date: 'June 28, 2026',
      author: 'Jane Smith',
      excerpt:
        'Prepare your home for high temperatures and storm season with our comprehensive maintenance tips.',
    },
    {
      id: 3,
      title: 'When to Hire an Electrician vs. DIY',
      date: 'June 24, 2026',
      author: 'Mike Johnson',
      excerpt:
        'Electrical work can be dangerous. Find out which tasks you can tackle yourself and when it is time to call a pro.',
    },
  ];

  return (
    <main className="flex-1 bg-linear-to-br from-white via-[#FAFAFA] to-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <h1 className="text-3xl font-bold text-[#0B2545] mb-8">Latest Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <span className="text-sm text-[#EE5E36] font-semibold">{post.date}</span>
              <h2 className="text-xl font-bold text-[#0B2545] mt-2 mb-3 hover:text-[#EE5E36] transition-colors cursor-pointer">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="text-sm text-gray-500">By {post.author}</span>
                <span className="text-sm text-[#EE5E36] font-semibold hover:underline cursor-pointer">
                  Read More →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
