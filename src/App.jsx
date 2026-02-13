import { SafeIcon } from './components/SafeIcon';
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, Calendar, Users, Sparkles, Zap, Heart, MessageCircle, Send, CheckCircle } from 'lucide-react'

// Web3Forms Hook
const useFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e, accessKey) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsError(false)

    const formData = new FormData(e.target)
    formData.append('access_key', accessKey)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        e.target.reset()
      } else {
        setIsError(true)
        setErrorMessage(data.message || 'Something went wrong')
      }
    } catch (error) {
      setIsError(true)
      setErrorMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSuccess(false)
    setIsError(false)
    setErrorMessage('')
  }

  return { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm }
}

// 3D Sphere Character Component
const SphereCharacter = () => {
  return (
    <motion.div
      className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="sphere-3d w-full h-full rounded-full relative overflow-hidden">
        {/* Face */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Eyes */}
            <motion.div
              className="absolute top-1/3 left-1/4 w-8 h-8 md:w-12 md:h-12 bg-black rounded-full"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.2, delay: 2, repeat: 3, repeatDelay: 3 }}
            >
              <div className="absolute top-1/4 right-1/4 w-2 h-2 md:w-3 md:h-3 bg-white rounded-full" />
            </motion.div>
            <motion.div
              className="absolute top-1/3 right-1/4 w-8 h-8 md:w-12 md:h-12 bg-black rounded-full"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.2, delay: 2, repeat: 3, repeatDelay: 3 }}
            >
              <div className="absolute top-1/4 right-1/4 w-2 h-2 md:w-3 md:h-3 bg-white rounded-full" />
            </motion.div>

            {/* Mouth */}
            <motion.div
              className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-6 h-8 md:w-8 md:h-10 bg-black rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Star sparkles on face */}
            <div className="absolute top-1/4 left-1/3 text-white text-xs md:text-sm">✦</div>
            <div className="absolute top-1/4 right-1/3 text-white text-xs md:text-sm">✦</div>
          </div>
        </div>

        {/* Highlight */}
        <div className="absolute top-8 left-8 w-16 h-16 md:w-24 md:h-24 bg-white/20 rounded-full blur-xl" />
      </div>

      {/* Shadow */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-8 md:w-48 md:h-12 bg-black/20 rounded-full blur-xl"
        animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.2, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  )
}

// Squiggle SVG Component
const Squiggle = ({ className = '', style = {} }) => (
  <svg
    viewBox="0 0 200 100"
    className={className}
    style={style}
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
  >
    <path
      d="M10 50 Q 30 10, 50 50 T 90 50 T 130 50 T 170 50 T 210 50"
      className="squiggle"
    />
  </svg>
)

// Rotating Badge Component
const RotatingBadge = () => (
  <motion.div
    className="relative w-24 h-24 md:w-32 md:h-32"
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <div className="absolute inset-0 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
      <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
        <defs>
          <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
        </defs>
        <text fontSize="11" fontWeight="bold" fill="white" letterSpacing="2">
          <textPath href="#circle">
            FLOW PARTY • FLOW PARTY • FLOW PARTY •
          </textPath>
        </text>
      </svg>
      <span className="text-white font-black text-lg md:text-2xl relative z-10">PARTY</span>
    </div>
  </motion.div>
)

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-indigo-600/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl md:text-3xl font-black text-white tracking-tighter"
            whileHover={{ scale: 1.05 }}
          >
            FLOW PARTY
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-white font-semibold transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2 border-2 border-white/30 rounded-full text-white font-semibold hover:bg-white/10 transition-colors">
              Join Community
            </button>
            <button className="px-6 py-2 bg-lime-400 text-indigo-900 rounded-full font-bold hover:bg-lime-300 transition-colors">
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center text-indigo-900"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <SafeIcon name={isOpen ? 'x' : 'menu'} size={24} />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-indigo-600 md:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-4xl font-black text-white tracking-tighter"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                className="mt-8 px-8 py-4 bg-lime-400 text-indigo-900 rounded-full font-bold text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Enroll Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Hero Section
const Hero = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500 to-indigo-600" />

      {/* Squiggles */}
      <motion.div
        className="absolute top-1/4 left-0 w-48 md:w-96 text-black/20"
        style={{ y: y1 }}
      >
        <Squiggle className="w-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-0 w-48 md:w-96 text-black/20 rotate-180"
        style={{ y: y2 }}
      >
        <Squiggle className="w-full" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Giant FLOW Text */}
        <div className="relative">
          <motion.h1
            className="text-[20vw] md:text-[18vw] lg:text-[15vw] font-black text-white leading-none tracking-tighter select-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            FLOW
          </motion.h1>

          {/* 3D Sphere positioned in center of text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <SphereCharacter />
          </div>
        </div>

        {/* Tagline */}
        <motion.p
          className="mt-8 text-lg md:text-2xl text-white/90 font-medium max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          THE FLOW PARTY IS A <span className="italic font-serif">safe</span>, INCLUSIVE, AND FUN
          <br className="hidden md:block" />
          SPACE FOR WEBSITE DEVELOPERS AND <span className="italic font-serif">designers</span>.
        </motion.p>

        {/* Rotating Badge - positioned bottom right on desktop */}
        <motion.div
          className="absolute bottom-20 right-4 md:right-20 hidden md:block"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
        >
          <RotatingBadge />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.button
            className="group px-8 py-4 bg-lime-400 text-indigo-900 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-lime-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Party
            <SafeIcon name="arrow-right' size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            className="px-8 py-4 border-2 border-white/50 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-4 h-4 bg-lime-400 rounded-full animate-pulse" />
      <div className="absolute bottom-40 left-10 w-6 h-6 bg-pink-500 rounded-full animate-pulse delay-700" />
      <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-white rounded-full animate-pulse delay-1000" />
    </section>
  )
}

// About Section
const About = () => {
  const features = [
    { icon: 'users', title: 'Community First', desc: 'Connect with like-minded creatives' },
    { icon: 'zap', title: 'Weekly Events', desc: 'Live sessions every Thursday' },
    { icon: 'sparkles', title: 'Creative Flow', desc: 'Unlock your design potential' },
    { icon: 'heart', title: 'Safe Space', desc: 'Inclusive environment for all' },
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-white text-indigo-900 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-lime-600 font-bold tracking-wider uppercase text-sm">About Us</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mt-4 mb-6">
              WHAT IS<br />FLOW PARTY?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Flow Party is a vibrant community where developers and designers come together
              to create, learn, and celebrate the art of web development. We believe in the
              power of creative collaboration and fostering an environment where everyone can thrive.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Whether you are a seasoned pro or just starting out, there is a place for you here.
              Join us for weekly events, workshops, and parties that will ignite your creativity.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SafeIcon name={feature.icon} size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-square bg-indigo-100 rounded-3xl overflow-hidden relative">
              <img
                src="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/user-photo-1.jpg"
                alt="Flow Party Community"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent" />

              {/* Floating card */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center">
                    <SafeIcon name="users' size={24} className="text-indigo-900" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-indigo-900">500+</p>
                    <p className="text-sm text-gray-600">Active Members</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-500 rounded-full opacity-20 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-lime-400 rounded-full opacity-20 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Events Section
const Events = () => {
  const events = [
    {
      date: 'JAN 25',
      title: 'Design Systems Workshop',
      time: '7:00 PM EST',
      type: 'Workshop',
      color: 'bg-pink-500'
    },
    {
      date: 'FEB 01',
      title: 'Creative Coding Night',
      time: '8:00 PM EST',
      type: 'Live Event',
      color: 'bg-lime-400 text-indigo-900'
    },
    {
      date: 'FEB 08',
      title: 'Portfolio Review Party',
      time: '7:30 PM EST',
      type: 'Community',
      color: 'bg-indigo-500'
    },
  ]

  return (
    <section id="events" className="py-20 md:py-32 bg-indigo-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            className="text-lime-400 font-bold tracking-wider uppercase text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Upcoming
          </motion.span>
          <motion.h2
            className="text-5xl md:text-7xl font-black text-white tracking-tighter mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            EVENTS &<br />WORKSHOPS
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={`absolute top-0 right-0 ${event.color} text-white text-xs font-bold px-4 py-2 rounded-bl-2xl`}>
                {event.type}
              </div>

              <div className="mb-6">
                <span className="text-4xl md:text-5xl font-black text-white/20">{event.date}</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-lime-400 transition-colors">
                {event.title}
              </h3>

              <div className="flex items-center gap-2 text-white/60 mb-6">
                <SafeIcon name="calendar' size={16} />
                <span className="text-sm">{event.time}</span>
              </div>

              <button className="w-full py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white hover:text-indigo-900 transition-all flex items-center justify-center gap-2 group-hover:border-white">
                Register
                <SafeIcon name="arrow-right' size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button className="px-8 py-4 bg-lime-400 text-indigo-900 rounded-full font-bold text-lg hover:bg-lime-300 transition-colors inline-flex items-center gap-2">
            View All Events
            <SafeIcon name="arrow-right' size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

// Gallery Section
const Gallery = () => {
  return (
    <section id="gallery" className="py-20 md:py-32 bg-pink-500 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12">
          <div>
            <motion.span
              className="text-white/80 font-bold tracking-wider uppercase text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Memories
            </motion.span>
            <motion.h2
              className="text-5xl md:text-7xl font-black text-white tracking-tighter mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              GALLERY
            </motion.h2>
          </div>

          <motion.p
            className="text-white/90 max-w-md mt-4 md:mt-0 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Moments from our past events and community gatherings.
          </motion.p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          <motion.div
            className="col-span-2 row-span-2 rounded-3xl overflow-hidden relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <img
              src="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/user-photo-1.jpg"
              alt="Gallery 1"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          <motion.div
            className="rounded-3xl overflow-hidden relative group bg-indigo-600"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">🎨</span>
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl overflow-hidden relative group bg-lime-400"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">💻</span>
            </div>
          </motion.div>

          <motion.div
            className="col-span-2 rounded-3xl overflow-hidden relative group bg-indigo-900"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute inset-0 flex items-center justify-center flex-col text-white p-6 text-center">
              <SafeIcon name="sparkles' size={48} className="mb-4 text-lime-400" />
              <p className="text-2xl font-bold">Join the next event</p>
              <p className="text-white/70">Be part of something amazing</p>
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl overflow-hidden relative group bg-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">🎉</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Contact Section
const Contact = () => {
  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler()
  const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'

  return (
    <section id="contact" className="py-20 md:py-32 bg-indigo-600 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.span
              className="text-lime-400 font-bold tracking-wider uppercase text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Get In Touch
            </motion.span>
            <motion.h2
              className="text-5xl md:text-7xl font-black text-white tracking-tighter mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              JOIN THE<br />PARTY
            </motion.h2>
          </div>

          <motion.div
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={(e) => handleSubmit(e, ACCESS_KEY)}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 text-sm font-semibold mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-lime-400 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-lime-400 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-semibold mb-2">Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-lime-400 transition-colors resize-none"
                      placeholder="Tell us about yourself..."
                    ></textarea>
                  </div>

                  {isError && (
                    <div className="text-pink-400 text-sm bg-pink-400/10 p-4 rounded-xl">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-lime-400 hover:bg-lime-300 disabled:bg-white/20 disabled:cursor-not-allowed text-indigo-900 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-indigo-900/30 border-t-indigo-900 rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <SafeIcon name="send' size={20} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-white/50 text-sm text-center">
                    Or email us directly at{' '}
                    <a href="mailto:hello@flowparty.com" className="text-lime-400 hover:underline">
                      hello@flowparty.com
                    </a>
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="text-center py-12"
                >
                  <div className="bg-lime-400/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <SafeIcon name="check-circle' size={48} className="text-lime-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-white/70 mb-8 max-w-md mx-auto">
                    Thanks for reaching out! We will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={resetForm}
                    className="text-lime-400 hover:text-lime-300 font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="bg-indigo-900 border-t border-white/10 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white tracking-tighter">FLOW PARTY</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <SafeIcon name="message-circle' size={24} />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>

          <p className="text-white/40 text-sm">
            © 2024 Flow Party. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-indigo-600 overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Events />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  )
}

export default App