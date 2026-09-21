// ---------------------------------------------------------------------------
// All editable church content lives here. Update these values and the whole
// site follows. Replace the Unsplash photo URLs with your own parish photos.
//
// Upcoming events live in a separate file, src/data/events.json, so they can
// be edited without touching any JavaScript. See the instructions at the top
// of that file for how to add, remove or reorder events.
// ---------------------------------------------------------------------------

import eventsData from './events.json'

export const church = {
  name: 'Tabernacle Of Mercy Parish',
  fullName: 'The Redeemed Christian Church of God, Tabernacle Of Mercy Parish',
  tagline: 'A Place of Worship, Fellowship and Transformation',
  address: 'Rufia Elemoro Street, Ibejulekki, Lagos State, Nigeria',
  phone: '+234 803 000 0000',
  phoneHref: '+2348030000000',
  whatsapp: '2348030000000',
  email: 'Tabernacleofmercy@gmail.com',
  mapEmbed: 'https://www.google.com/maps?q=King of Elemoro Palace,+Lagos,+Nigeria&output=embed',
  socials: [
    { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { name: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
    { name: 'X', href: 'https://x.com', icon: 'x' },
  ],
}

export const services = [
  {
    day: 'Sunday',
    name: 'Sunday Service',
    time: '8:00 AM - 11:30 AM',
    detail:
      'Our main celebration service - praise, worship, the preaching of the Word and communion on the first Sunday of every month.',
    note: 'Sunday School begins at 7:30 AM',
    icon: 'church',
  },
  {
    day: 'Tuesday',
    name: 'Digging Deep',
    time: '6:30 PM - 8:00 PM',
    detail:
      'A mid-week Bible study for believers who want to go deeper into Scripture, verse by verse, with room for questions.',
    note: 'Bring your Bible and notebook',
    icon: 'book',
  },
  {
    day: 'Thursday',
    name: 'Faith Clinic',
    time: '6:30 PM - 7:30 PM',
    detail:
      'An evening of prayer, intercession and ministration where burdens are lifted and faith is built for the days ahead.',
    note: 'Prayer requests received from 5:00 PM',
    icon: 'prayer',
  },
]

export const ministries = [
  {
    slug: 'choir',
    name: 'Choir',
    blurb:
      'Leading the congregation into the presence of God through Spirit-filled praise and worship every service.',
    description:
      'The Choir Ministry carries the sound of our parish. We rehearse weekly, train new voices and instrumentalists, and lead worship at every service and special programme. If you can sing or play an instrument, there is a place for you here.',
    meets: 'Rehearsals - Saturdays, 5:00 PM',
    leader: 'Bro. Ayodele Micheal',
    image:
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'youth',
    name: 'Youth Department',
    blurb:
      'Raising a generation of young people who are grounded in the Word and bold about their faith.',
    description:
      'Youth Church is where our teenagers and young adults belong. Through teaching, mentorship, career guidance and wholesome fellowship, we help young people build a faith that stands on campus, at work and at home.',
    meets: '3rd Sundays, 8:00 AM - 11:30 AM',
    leader: 'Bro. Ayodele Micheal',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'children',
    name: 'Children Church',
    blurb:
      'A safe, joyful place where our little ones learn the Word of God at their own level.',
    description:
      'Children Church teaches the Bible through songs, stories, memory verses and creative activities. Our teachers are trained and vetted, and every child is signed in and out by a parent or guardian for their safety.',
    meets: 'Sundays, 8:00 AM - Children Hall',
    leader: 'Pastor Mrs. Alfred Lawrence',
    image:
      'https://images.unsplash.com/photo-1602052793312-b99c2a9ee797?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'prayer',
    name: 'Prayer Department',
    blurb:
      'Standing in the gap for the church, the nation and every request brought before us.',
    description:
      'The Prayer Department is the engine room of the parish. We hold early morning prayers, night vigils and intercession for members and their families. Every prayer request submitted to the church is prayed over here.',
    meets: 'Vigil - Last Friday of the month, 10:00 PM',
    leader: 'Pastor Alfred Lawrence',
    image:
      'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'evangelism',
    name: 'Evangelism',
    blurb:
      'Taking the good news beyond our walls to homes, streets and communities around us.',
    description:
      'The Evangelism Ministry organises house-to-house outreach, hospital and prison visits, tract distribution and community service. We also follow up with every new convert to help them settle into the family of God.',
    meets: 'Outreach - Saturdays, 8:00 AM',
    leader: 'Elder Thomas Sunday',
    image:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'media',
    name: 'Media Team',
    blurb:
      'Capturing and broadcasting the message so it reaches far beyond the four walls of the parish.',
    description:
      'The Media Team handles sound, live streaming, photography, video and our online platforms. We record every sermon and publish it so members who are travelling - and people we may never meet - can still be fed.',
    meets: 'Planning - Saturdays, 5:00 PM',
    leader: 'Bro. Kingsley Akpan',
    image:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
  },
]

export const events = eventsData

// Sermons are now managed dynamically through the Firebase admin panel.
// Remove this export as it's no longer needed.

export const leadership = [
  {
    name: 'Pastor Alfred Lawrence',
    role: 'Parish Pastor',
    bio: 'Pastor Lawrence has served in pastoral ministry for over eighteen years and has led Tabernacle Of Mercy Parish since 2015. He is known for clear, practical teaching of the Word.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Pastor (Mrs) Alfred Lawrence',
    role: 'Assistant Pastor - Women Ministry',
    bio: 'Pastor Lawrence oversees the women fellowship and counselling ministry, walking with families through the seasons of life with wisdom and compassion.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Decon Humphery ',
    role: 'Associate Pastor - Discipleship',
    bio: 'Decon Humphery coordinates our house fellowships, workers-in-training programme and the discipleship pathway for new members.',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Pastor Alfred Lawrence',
    role: 'Head, Prayer Department',
    bio: 'Pastor Alfred has led the intercessory arm of the parish for nine years and coordinates our monthly vigils and daily prayer chain.',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Decon. Duncan',
    role: 'Music Director',
    bio: 'Decon Duncan directs the choir and instrumentalists, and trains new members in worship leading and musicianship.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Pastor Mrs. Alfred Lawrence',
    role: 'Head, Children Church',
    bio: 'Pastor Mrs Alfred leads a team of trained teachers caring for children from creche age through to pre-teens every Sunday.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  },
]

export const coreValues = [
  {
    title: 'The Word of God',
    text: 'Scripture is our final authority. We teach it plainly, apply it honestly and submit our opinions to it.',
    icon: 'book',
  },
  {
    title: 'Prayer',
    text: 'We are a praying parish. Nothing of eternal value happens here that was not first asked for on our knees.',
    icon: 'prayer',
  },
  {
    title: 'Holiness',
    text: 'We pursue lives that match our confession, by the grace of God and the help of the Holy Spirit.',
    icon: 'dove',
  },
  {
    title: 'Family',
    text: 'No one should worship alone. We know each other by name and carry one another burdens.',
    icon: 'people',
  },
  {
    title: 'Service',
    text: 'Every member is a minister. We each bring our gifts to build up the body and serve our community.',
    icon: 'hands',
  },
  {
    title: 'Evangelism',
    text: 'We are sent. The good news that saved us is meant to be carried to everyone around us.',
    icon: 'globe',
  },
]

export const givingCategories = [
  {
    name: 'Tithe',
    description:
      'Returning the first tenth of our increase to God as an act of obedience and worship.',
    verse: 'Malachi 3:10',
    icon: 'tithe',
  },
  {
    name: 'Offering',
    description:
      'Freewill giving that supports the weekly work, worship and running of the parish.',
    verse: '2 Corinthians 9:7',
    icon: 'offering',
  },
  {
    name: 'Thanksgiving',
    description:
      'A special seed sown in gratitude for answered prayer and the goodness of God.',
    verse: 'Psalm 116:17',
    icon: 'thanks',
  },
  {
    name: 'Building Fund',
    description:
      'Supporting the expansion of our auditorium and facilities for a growing congregation.',
    verse: '1 Chronicles 29:9',
    icon: 'building',
  },
]

export const accounts = [
  {
    name: 'Main',
    accountName: 'RCCG TABERNACLE OF MERCY',
    accountNumber: '0152758658',
    sortCode: '011-152-003',
  },
  {
    name: 'Building',
    accountName: 'RCCG TABERNACLE OF MERCY BUILDING ACCOUNT',
    accountNumber: '0159059464',
    sortCode: '011-152-003',
  },
  {
    name: 'Welfare',
    accountName: 'RCCG TABERNACLE OF MERCY WELFARE ACCOUNT',
    accountNumber: '0159059505',
    sortCode: '011-152-003',
  },
];

export const quickLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Ministries', to: '/ministries' },
  { label: 'Events', to: '/events' },
  { label: 'Sermons', to: '/sermons' },
  { label: 'Give Online', to: '/give' },
  { label: 'Prayer Request', to: '/prayer-request' },
  { label: 'Contact Us', to: '/contact' },
]

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Ministries', to: '/ministries' },
  { label: 'Events', to: '/events' },
  { label: 'Sermons', to: '/sermons' },
  { label: 'Give Online', to: '/give' },
  { label: 'Contact', to: '/contact' },
]
