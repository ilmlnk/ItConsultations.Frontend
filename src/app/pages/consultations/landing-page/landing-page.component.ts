import { Component } from '@angular/core';
import {
  faGoogle,
  faFacebook,
  faAmazon,
  faMicrosoft,
  faAirbnb,
  faApple
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-landing-page',
  standalone: false,

  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  scrollingCompanies: any[] = [];
  companies = [
    { name: 'Google', icon: faGoogle, color: '#DB4437' },
    { name: 'Facebook', icon: faFacebook, color: '#4267B2' },
    { name: 'Amazon', icon: faAmazon, color: '#FF9900' },
    { name: 'Microsoft', icon: faMicrosoft, color: '#00A4EF' },
    { name: 'Airbnb', icon: faAirbnb, color: '#FF5A5F' }
  ];

  selectedIndex = 0;

  cases = [
    {
      title: 'Technical Help',
      description: 'Stuck with a complex problem? Get instant support.',
      tags: ['Code review', 'Complex bugfix troubleshooting', 'Project architecture', 'Performance optimization']
    },
    {
      title: 'Career Growth',
      description: 'Level up your skills with guidance from the best.',
      tags: ['Mock Interviews', 'Roadmap creation', 'Salary negotiation', 'Soft skills mentorship']
    },
    {
      title: 'For your Own Business',
      description: 'Build your product right from the start.',
      tags: ['MVP Scope', 'Tech Stack selection', 'Hiring assistance', 'Scalability planning']
    }
  ];

  experts = [
    {
      name: 'Alex Johnson',
      role: 'Senior Frontend Engineer',
      company: 'Google',
      bio: 'Ex-Facebook. Specialist in Angular optimization and large-scale architecture. Helping developers move from Junior to Senior in 6 months.',
      skills: ['Angular', 'RxJS', 'Web Performance', 'System Design'],
      avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
      photoUrl: 'https://i.pravatar.cc/400?u=a042581f4e29026024d'
    },
    {
      name: 'Sarah Connor',
      role: 'CTO & Co-Founder',
      company: 'TechStart',
      bio: 'Leading a team of 50+ engineers. I help with career strategy, salary negotiations, and moving into management roles.',
      skills: ['Leadership', 'Hiring', 'Startup Growth', 'Management'],
      avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      photoUrl: 'https://i.pravatar.cc/400?u=a042581f4e29026704d'
    },
    {
      name: 'Michael Chen',
      role: 'Principal Architect',
      company: 'Netflix',
      bio: 'Expert in microservices and cloud infrastructure. I conduct mock system design interviews.',
      skills: ['AWS', 'Microservices', 'Java', 'Kotlin'],
      avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
      photoUrl: 'https://i.pravatar.cc/400?u=a042581f4e29026704e'
    }
  ];

  topCategories = [
    {
      name: 'Programming',
      icon: '💻',
      desc: 'Frontend, Backend, Mobile & DevOps',
      color: 'linear-gradient(135deg, #FF0055, #FF00CC)'
    },
    {
      name: 'Management',
      icon: '👔',
      desc: 'Project Management, CTO, Team Lead',
      color: 'linear-gradient(135deg, #00E5FF, #007AFF)'
    },
    {
      name: 'Marketing',
      icon: '📈',
      desc: 'SEO, ASO, PPC & Brand Strategy',
      color: 'linear-gradient(135deg, #FFD700, #FF8C00)'
    }
  ];

  techStack = [
    { name: 'Angular', icon: '🅰️' },
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Agile', icon: '🔄' },
    { name: 'Scrum', icon: '⏱️' },
    { name: 'UI/UX Design', icon: '🎨' },
    { name: 'QA Testing', icon: '🐞' }
  ];

  benefits = [
    {
      title: 'Expert Developers',
      desc: 'Top 1% talent from leading tech giants.',
      stars: [1, 2, 3, 4, 5]
    },
    {
      title: 'Personalized Consultations',
      desc: 'Tailored specifically to your project needs.',
      stars: [1, 2, 3, 4, 5]
    },
    {
      title: 'Flexible Scheduling',
      desc: 'Book slots that fit your time zone perfectly.',
      stars: [1, 2, 3, 4, 5]
    },
    {
      title: 'Affordable Pricing',
      desc: 'Premium knowledge without the agency markup.',
      stars: [1, 2, 3, 4, 5]
    },
    {
      title: 'Proven Results',
      desc: 'Over 1000+ developers helped successfully.',
      stars: [1, 2, 3, 4, 5]
    },
    {
      title: 'Satisfaction Guarantee',
      desc: 'Not happy with the session? Get a full refund or re-book for free.',
      stars: [1, 2, 3, 4, 5]
    }
  ];

  steps = [
    {
      title: 'Book a Slot',
      description: 'Choose a mentor and pick a time that works for you. Seamless calendar integration.',
      icon: '📅'
    },
    {
      title: '1-on-1 Video Session',
      description: 'Join the call directly on our platform. No external links needed. Focus on the conversation while we handle the rest.',
      icon: '📹',
      features: ['🔴 Video Recording', '📝 Live Shared Notes', '🔤 Real-time Transcription']
    },
    {
      title: 'Wrap-up & Growth',
      description: 'Receive a summary with action items and the recording. Happy with the progress?',
      icon: '🚀',
      cta: 'Schedule Recurring Session'
    }
  ];

  messages = [
    {
      author: 'David K.',
      avatar: 'https://i.pravatar.cc/150?u=1',
      platform: 'LinkedIn',
      time: '10:42 AM',
      text: 'Hey! Just wanted to say thanks. That architecture review we did? My team finally stopped arguing and we shipped the feature today. 🚀',
      type: 'received'
    },
    {
      author: 'Marina S.',
      avatar: 'https://i.pravatar.cc/150?u=5',
      platform: 'Telegram',
      time: 'Yesterday',
      text: 'Got the Senior offer at Spotify! 🎉 I honestly think the mock interview made the difference. I was so calm during the system design round.',
      type: 'received'
    },
    {
      author: 'James R.',
      avatar: 'https://i.pravatar.cc/150?u=8',
      platform: 'Email',
      time: '2 days ago',
      text: 'Your advice on salary negotiation worked. They bumped the offer by 20%. Drinks are on me next time you\'re in London!',
      type: 'received'
    }
  ];

  faqs = [
    {
      question: 'How do I schedule a session?',
      answer: 'Simply click "Find a Coach", browse our experts, and select a time slot that works for you. The calendar adjusts to your local time zone automatically.'
    },
    {
      question: 'What if I am not satisfied with the consultation?',
      answer: 'We offer a 100% Satisfaction Guarantee. If the session didn’t meet your expectations, contact support within 24 hours for a full refund or a free session with another expert.'
    },
    {
      question: 'Can I record the video call?',
      answer: 'Yes! Our platform has a built-in recording feature. You will receive the video file and a transcript immediately after the session ends.'
    },
    {
      question: 'I want to be a coach. How does the payout work?',
      answer: 'We process payouts weekly via Stripe or PayPal. You set your own hourly rate, and we take a small commission to cover platform fees.'
    },
    {
      question: 'Do you offer long-term mentorship?',
      answer: 'Absolutely. Many of our experts offer "Mentorship Packages" which include weekly calls, code reviews, and roadmap planning at a discounted rate.'
    }
  ];

  ngOnInit() {
    this.scrollingCompanies = [...this.companies, ...this.companies, ...this.companies];
  }

  selectTab(index: number): void {
    this.selectedIndex = index;
  }

  selectExpert(index: number): void {
    this.selectedIndex = index;
  }
}
