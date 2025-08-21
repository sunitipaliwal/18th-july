import React, { useState } from 'react';
import axios from 'axios';
import { 
  BookOpen, 
  Upload, 
  Image, 
  DollarSign, 
  FileText, 
  User, 
  Tag, 
  Clock,
  Star,
  Eye,
  EyeOff,
  X,
  Zap,
  Sparkles
} from 'lucide-react';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    genre: '',
    description: '',
    bookLength: '',
    price: ''
  });

  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [bookfile, setBookfile] = useState(null);

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction', 
    'Fantasy', 'Biography', 'History', 'Self-Help', 'Technology',
    'Business', 'Health', 'Travel', 'Cooking', 'Art', 'Poetry'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setCoverImagePreview(reader.result);
      reader.readAsDataURL(file);
      if (errors.coverImage) {
        setErrors(prev => ({ ...prev, coverImage: '' }));
      }
    }
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
    setCoverImagePreview(null);
    const fileInput = document.getElementById('cover-image-input');
    if (fileInput) fileInput.value = '';
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.authorName.trim()) newErrors.authorName = 'Author name is required';
    if (!formData.genre) newErrors.genre = 'Please select a genre';
    if (!formData.bookLength || Number(formData.bookLength) <= 0) {
      newErrors.bookLength = 'Book length must be a positive number';
    }
    if (formData.price === '' || Number(formData.price) < 0) {
      newErrors.price = 'Price must be a positive number';
    }
    if (formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }
    if (!bookfile) newErrors.bookFile = 'Please upload a book file';
    if (!coverImage) newErrors.coverImage = 'Please upload a cover image';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const submitFormData = new FormData();
      submitFormData.append("title", formData.title);
      submitFormData.append("authorName", formData.authorName);
      submitFormData.append("genre", formData.genre);
      submitFormData.append("description", formData.description);
      submitFormData.append("bookLength", formData.bookLength);
      submitFormData.append("price", formData.price);
      if (coverImage) submitFormData.append("coverImage", coverImage);  // matches backend
      if (bookfile) submitFormData.append("file", bookfile);            // matches backend

      // Optional: debug
      // for (let pair of submitFormData.entries()) console.log(pair[0] + ':', pair[1]);

      for (let [k, v] of submitFormData.entries()) {
  if (v instanceof File) {
    console.log(`${k}: File(${v.name}, ${v.type}, ${v.size} bytes)`);
  } else {
    console.log(`${k}:`, v);
  }
}


      const res = await axios.post(
        "http://localhost:3000/api/book/add-book",
        submitFormData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert('Book added successfully!');

      setFormData({
        title: '',
        authorName: '',
        genre: '',
        description: '',
        bookLength: '',
        price: ''
      });
      setCoverImage(null);
      setCoverImagePreview(null);
      setBookfile(null);
      setErrors({});

      const coverInput = document.getElementById("cover-image-input");
      if (coverInput) coverInput.value = "";
      const bookInput = document.getElementById("book-file-input");
      if (bookInput) bookInput.value = "";
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      let errorMessage = 'Error adding book. Please try again.';
      if (typeof error.response?.data === 'string') {
        if (error.response.data.includes('MulterError: File too large')) {
          errorMessage = 'File size is too large. Please choose a smaller file (max 100MB).';
        } else {
          errorMessage = error.response.data;
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setBookfile(e.dataTransfer.files);
      if (errors.bookFile) {
        setErrors(prev => ({ ...prev, bookFile: '' }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Add Your Book
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Share your story with the world. Fill out the details below to publish your book.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
                  <p className="text-gray-600">Fill in the information about your book</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{previewMode ? 'Edit' : 'Preview'}</span>
              </button>
            </div>
          </div>

          {!previewMode ? (
            /* Form */
            <div className="p-8 space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <SectionHeader icon={BookOpen} title="Basic Information" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Book Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    error={errors.title}
                    placeholder="Enter your book title"
                    icon={BookOpen}
                    required
                  />
                  
                  <FormField
                    label="Author Name"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleInputChange}
                    error={errors.authorName}
                    placeholder="Enter author name"
                    icon={User}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Genre <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300 ${
                          errors.genre ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a genre</option>
                        {genres.map(genre => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </select>
                    </div>
                    {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
                  </div>

                  <FormField
                    label="Price ($)"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    error={errors.price}
                    placeholder="0.00"
                    icon={DollarSign}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Description
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your book (max 1000 characters)"
                      rows={4}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300 resize-none ${
                        errors.description ? 'border-red-300' : 'border-gray-300'
                      }`}
                      maxLength={1000}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{errors.description && <span className="text-red-500">{errors.description}</span>}</span>
                    <span>{formData.description.length}/1000</span>
                  </div>
                </div>
              </div>

              {/* Files & Media */}
              <div className="space-y-6">
                <SectionHeader icon={Upload} title="Files & Media" />
                
                <div className="grid grid-cols-1 gap-6">
                  {/* Cover Image Upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Cover Image <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="cover-image-input"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="cover-image-input"
                        className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 transition-colors duration-300"
                      >
                        {coverImagePreview ? (
                          <div className="relative w-full h-full">
                            <img 
                              src={coverImagePreview} 
                              alt="Cover preview" 
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                handleRemoveImage();
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-300"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload cover image</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                    {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage}</p>}
                  </div>
                </div>

                <FormField
                  label="Book Length (pages)"
                  name="bookLength"
                  type="number"
                  value={formData.bookLength}
                  onChange={handleInputChange}
                  error={errors.bookLength}
                  placeholder="Enter number of pages"
                  icon={Clock}
                  required
                  min="1"
                />

                {/* File Drop Zone with hidden input for click-to-upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Book File <span className="text-red-500">*</span>
                  </label>

              <input
  type="file"
  id="book-file-input"
  accept=".pdf,.epub,.mobi,.txt,.doc,.docx,application/pdf,application/epub+zip,application/x-mobipocket-ebook,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  onChange={(e) => {
    const f = e.target.files?.[0];
    if (f) {
      setBookfile(f);
      if (errors.bookFile) setErrors(prev => ({ ...prev, bookFile: '' }));
    }
  }}
  className="hidden"
/>


               <div
  role="button"
  tabIndex={0}
  onClick={() => document.getElementById('book-file-input')?.click()}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      document.getElementById('book-file-input')?.click();
    }
  }}
  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${
    dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
  }`}
  onDragEnter={handleDrag}
  onDragLeave={handleDrag}
  onDragOver={handleDrag}
  onDrop={handleDrop}
>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drop files here or click to upload</p>
                    <p className="text-sm text-gray-500">Supports PDF, EPUB, MOBI, TXT, DOC, DOCX</p>
                    
                    {bookfile && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700 font-medium">
                          ✓ File selected: {bookfile.name}
                        </p>
                      </div>
                    )}
                  </div>

                  {errors.bookFile && <p className="text-red-500 text-sm mt-2">{errors.bookFile}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-8 border-top border-gray-200">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                  onClick={() => {
                    setFormData({
                      title: '',
                      authorName: '',
                      genre: '',
                      description: '',
                      bookLength: '',
                      price: ''
                    });
                    setCoverImage(null);
                    setCoverImagePreview(null);
                    setBookfile(null);
                    setErrors({});
                    const fileInput = document.getElementById('cover-image-input');
                    if (fileInput) fileInput.value = '';
                    const bookInput = document.getElementById('book-file-input');
                    if (bookInput) bookInput.value = '';
                  }}
                >
                  Clear Form
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5" />
                      <span>Publish Book</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Preview Mode */
            <div className="p-8">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="h-6 w-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">Book Preview</h3>
                </div>
                <p className="text-gray-600">This is how your book will appear to readers</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Book Cover */}
                <div className="space-y-4">
                  <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300">
                    {coverImagePreview ? (
                      <img 
                        src={coverImagePreview} 
                        alt="Book cover" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <Image className="h-16 w-16 text-purple-400 mx-auto mb-2" />
                        <p className="text-purple-600 font-medium">No cover image</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">New Release</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {formData.bookLength || '0'} pages
                      </span>
                    </div>
                  </div>
                </div>

                {/* Book Details */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {formData.title || 'Untitled Book'}
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                      by {formData.authorName || 'Unknown Author'}
                    </p>
                    
                    <div className="flex items-center space-x-4 mb-6">
                      {formData.genre && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          {formData.genre}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-green-600">
                        ${formData.price || '0.00'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {formData.description || 'No description provided.'}
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                      Buy Now
                    </button>
                    <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Components
const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
    <div className="p-2 bg-purple-100 rounded-lg">
      <Icon className="h-5 w-5 text-purple-600" />
    </div>
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
  </div>
);

const FormField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  placeholder, 
  icon: Icon, 
  required = false,
  type = "text",
  ...props 
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300 ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
        {...props}
      />
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default AddBook;
