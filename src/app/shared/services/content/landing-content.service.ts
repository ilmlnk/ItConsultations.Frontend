import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FeatureCard } from '../../models/interfaces/features-card.interface';
import {
  faAmazon,
  faFacebook,
  faGoogle,
  faMicrosoft,
  faAirbnb,
  faAngular,
  faReact,
  faNodeJs,
  faPython,
  faAws,
  faDocker
} from '@fortawesome/free-brands-svg-icons';
import {
  faA,
  faArrowsToCircle,
  faBug,
  faPalette
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class LandingContentService {
  // hero section
  private readonly heroSectionData = [];
  // info section
  private readonly infoSectionData = [];
  // partners block section
  private readonly partnersData = [
    { name: 'Google', icon: faGoogle, color: '#DB4437' },
    { name: 'Facebook', icon: faFacebook, color: '#4267B2' },
    { name: 'Amazon', icon: faAmazon, color: '#FF9900' },
    { name: 'Microsoft', icon: faMicrosoft, color: '#00A4EF' },
    { name: 'Airbnb', icon: faAirbnb, color: '#FF5A5F' }
  ];
  // use cases section
  private readonly useCasesData = [
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
  // categories section
  private readonly categoriesData = [
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
  private readonly techStackData = [
    { name: 'Angular', icon: faAngular },
    { name: 'React', icon: faReact },
    { name: 'Node.js', icon: faNodeJs },
    { name: 'Python', icon: faPython },
    { name: 'AWS', icon: faAws },
    { name: 'Docker', icon: faDocker },
    { name: 'Agile', icon: faA },
    { name: 'Scrum', icon: faArrowsToCircle },
    { name: 'UI/UX Design', icon: faPalette },
    { name: 'QA Testing', icon: faBug }
  ];
  // experts section
  private readonly expertsData = [
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
  // roadmap section
  private readonly roadmapData = [
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
  // why us section
  private readonly featuresData: FeatureCard[] = [
    {
      id: 'exp',
      title: 'Expert Developers',
      description: 'Top 1% talent from leading tech giants.',
      icon: 'pi pi-users',
      color: '#4caf50'
    },
    {
      id: 'fast',
      title: 'Lightning Fast',
      description: 'Optimized performance for best SEO results.',
      icon: 'pi pi-bolt',
      color: '#ffc107'
    },
    {
      id: 'secure',
      title: 'Bank-Grade Security',
      description: 'Enterprise level data protection standards.',
      icon: 'pi pi-lock',
      color: '#2196f3'
    }
  ];
  // feedback section
  private readonly feedbackData = [
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
  // faq section
  private readonly faqData = [
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

  constructor() { }

  get heroSection(): Observable<any> {
      return of(this.heroSectionData);
  }

  get infoSection(): Observable<any> {
      return of(this.infoSectionData);
  }

  get partners(): Observable<any> {
      return of(this.partnersData);
  }

  get useCases(): Observable<any> {
      return of(this.useCasesData);
  }

  get categories(): Observable<any> {
      return of(this.categoriesData);
  }

  get experts(): Observable<any> {
      return of(this.expertsData);
  }

  get roadmap(): Observable<any> {
      return of(this.roadmapData);
  }

  get features(): Observable<FeatureCard[]> {
      return of(this.featuresData);
  }

  get feedbacks(): Observable<any> {
      return of(this.feedbackData);
  }

  get faqs(): Observable<any> {
      return of(this.faqData);
  }
}
