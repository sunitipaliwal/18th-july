import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, BookOpen, Heart, Calendar, Library } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myBooks, setMyBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user info (+ populated publishedBooks & favorites)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user/profile", { withCredentials: true });
        if (res.data?.success) {
          const u = res.data.user;
          setUser(u);
          setMyBooks(u.publishedBooks || []);
          setFavorites(u.favorites || []);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-28 bg-white/5 rounded-2xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-24 bg-white/5 rounded-xl" />
              <div className="h-24 bg-white/5 rounded-xl" />
              <div className="h-24 bg-white/5 rounded-xl" />
            </div>
            <div className="h-8 bg-white/5 rounded-xl w-64" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="h-64 bg-white/5 rounded-xl" />
              <div className="h-64 bg-white/5 rounded-xl" />
              <div className="h-64 bg-white/5 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Please log in</h2>
          <p className="text-gray-400">Sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/5 rounded-2xl p-6 flex items-center space-x-6 mb-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold">
            {user.username?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-gray-400">{user.email}</p>
            <div className="flex items-center text-gray-400 text-sm mt-1">
              <Calendar className="h-4 w-4 mr-2" />
              Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard icon={BookOpen} value={myBooks.length} label="Books Published" />
          <StatCard icon={Heart} value={favorites.length} label="Total Favorites" />
          <StatCard icon={Library} value={user.booksBought?.length || 0} label="Books Bought" />
        </div>

        {/* Published Books */}
        <Section title="Your Published Books">
          {myBooks.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {myBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <EmptyMessage text="You haven't published any books yet." />
          )}
        </Section>

        {/* Favorite Books */}
        <Section title="Your Favorites">
          {favorites.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <EmptyMessage text="You haven't favorited any books yet." />
          )}
        </Section>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, value, label }) => (
  <div className="bg-white/5 rounded-xl p-6 flex items-center space-x-4">
    <div className="p-3 rounded-full bg-purple-500/20">
      <Icon className="h-6 w-6 text-purple-400" />
    </div>
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const EmptyMessage = ({ text }) => (
  <p className="text-gray-400">{text}</p>
);

const BookCard = ({ book }) => {
  const cover = book.coverImageUrl
    ? `http://localhost:3000/${String(book.coverImageUrl).replace(/^\/?/, '')}`
    : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop";
  return (
    <div className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300">
      <img src={cover} alt={book.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-gray-400 text-sm">by {book.authorName}</p>
        <p className="text-purple-400 font-bold mt-2">${book.price}</p>
      </div>
    </div>
  );
};

export default Profile;
