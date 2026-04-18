import { Injectable, signal, computed, effect } from '@angular/core';

export type Lang = 'en' | 'ar';
export type Dir = 'ltr' | 'rtl';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private lang = signal<Lang>('en');

  currentLang = computed(() => this.lang());
  currentDir = computed<Dir>(() => (this.lang() === 'ar' ? 'rtl' : 'ltr'));

  private dictionary: any = {
    en: {
      nav: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        work: 'Work',
        projects: 'Projects',
        contact: 'Contact'
      },
      hero: {
        welcome: 'Code Square',
        headline: ['WE', 'ENGINEER', 'RESILIENT', 'DIGITAL', 'SOLUTIONS', 'THAT', 'REDEFINE', 'THE', 'FUTURE'],
        sub: 'We turn complex ideas into effortless digital experiences',
        cta: 'Enter System'
      },
      services: {
        title: "Our Engineering Specialities",
        subtitle: "Architected for scale and performance",
        explore: "Explore",
        items: {
          mobile: {
            title: 'Mobile Applications',
            desc: 'Native and cross-platform apps (Android & iOS) that feel right and work incredibly fast globally.',
            features: ['Flutter', 'React Native', 'Swift']
          },
          web: {
            title: 'Web Development',
            desc: 'Build performant, scalable web applications with modern frameworks. From MVPs to robust enterprise portals.',
            features: ['React', 'Angular', 'Node.js', 'AWS']
          },
          saas: {
            title: 'SaaS Systems',
            desc: 'Scalable multi-tenant platforms built for explosive growth with robust billing and user management integrations.',
            features: ['Multi-tenant Logic', 'Stripe Integration']
          },
          ai: {
            title: 'AI Solutions',
            desc: 'Intelligent automation systems for smarter workflows. We integrate robust LLMs directly into your data pipelines.',
            features: ['Machine Learning', 'RAG Pipelines', 'OpenAI APIs']
          },
          ui: {
            title: 'UI/UX Design',
            desc: 'Interfaces that balance aesthetics with massive usability. Awwwards-tier visual designs targeting intense user retention.',
            features: ['Figma Prototyping', 'User Research']
          },
          system: {
            title: 'System Integration',
            desc: 'Connecting IoT arrays and Smart Systems. We unify fragmented hardware endpoints into centralized observability dashboards.',
            features: ['IoT protocols', 'API Gateways', 'Docker']
          },
          support: {
            title: 'Maintenance & Support',
            desc: 'Rigorous post-launch maintenance ensures sustained digital velocity and maximum uptime. We monitor servers globally.',
            features: ['24/7 Monitoring', 'SLA Guarantees', 'CI/CD']
          }
        }
      },
      vision: {
        vision_title: "OUR VISION",
        vision_desc: "To be the global benchmark for engineering excellence, where software isn't just code, but a masterpiece of architecture.",
        mission_title: "OUR MISSION",
        mission_desc: "We empower enterprises by architecting robust digital ecosystems that drive sustainable growth and redefine user expectations.",
        badge: "Strategic Core"
      },
      about: {
        title: "Who We Are",
        quote: "We don't just build software… we architect scalable solutions that redefine industries.",
        secondary: "Our team of elite engineers and designers craft digital experiences that leave a lasting impact."
      },
      process: {
        title: "Our Process",
        steps: [
          { title: 'Foundation', description: 'Strategic discovery to understand vision, goals, and technical requirements mapping.', align: 'left' },
          { title: 'Architecture', description: 'Designing robust blueprints tailored to scale and perform flawlessly under load.', align: 'right' },
          { title: 'Engineering', description: 'Building with precision, leveraging modern frameworks and industry-standard best practices.', align: 'left' },
          { title: 'Launch & Iterate', description: 'Seamless deployment pipelines followed by continuous optimization loops.', align: 'right' }
        ]
      },
      philosophy: {
        title: "Our Philosophy",
        body: "Every project is unique. Every business is different. That's why we start with deep understanding—not templates. We analyze your needs, understand your goals, and architect solutions that scale with your growth.",
        pillars: [
          "We don't chase trends. We build fundamentals that last.",
          "We don't just code. We architect for scale.",
          "We're not just service providers. We're your technology partner."
        ]
      },
      strengths: {
         title: "Why Choose Code Square",
         subtitle: "8 reasons we're different",
         items: [
           { title: "Deep Business Understanding", desc: "We analyze your business rules before deploying development architectures." },
           { title: "Custom & Scalable", desc: "No generic templates. Built natively to grow alongside your increasing traffic." },
           { title: "Deadline Commitment", desc: "Rigorous agile sprints ensure we map correctly to your time-to-market." },
           { title: "Continuous Support", desc: "Post-launch maintenance ensures sustained digital velocity and reliability." },
           { title: "Strategic Thinking", desc: "We partner with visionary frameworks to innovate across digital verticals." },
           { title: "High-quality UI/UX", desc: "Awwwards-tier visual designs targeting intense user retention." },
           { title: "Partnership Mindset", desc: "Deep integrations directly acting as your outsourced CTO & product arm." },
           { title: "Efficient Execution", desc: "Streamlined CI/CD pipelines enabling sub-millisecond build iterations." }
         ]
      },
      projects: {
        title: "Selected Works",
        subtitle: "Projects that redefine industries",
        status: { progress: 'In Progress', updating: 'Updating', idea: 'Idea', live: 'Live' },
        types: { internal: 'Internal Project', product: 'Internal Product', saas: 'SaaS Product', b2b: 'B2B System', b2bweb: 'B2B Web App', b2g: 'B2G Project' },
        items: [
          { title: 'M Tech Square Website', desc: 'Corporate website showcasing M Tech Square Group\'s technology ecosystem with cinematic animations.' },
          { title: 'Techno Square Platform', desc: 'Educational platform with integrated mobile app for Techno Square\'s online learning programs.' },
          { title: 'Dr. X Series', desc: 'Health management SaaS platform for patient records and AI-powered diagnostic insights.' },
          { title: 'El Shoush Travel System', desc: 'Comprehensive travel booking system for agencies with multi-language support (Maps API).' },
          { title: 'Osama Sakr Manning Agency', desc: 'Agency management platform for recruitment, tracking, and team collaboration.' },
          { title: 'Port Said Tourism App', desc: 'Government-backed digital tourism experience for the city of Port Said.' }
        ]
      },
      cta: {
        pitch: "Let's build something extraordinary.",
        sub: "Whether you need a high-performance web app, a native mobile experience, or a complex enterprise system—we're ready to engineer it.",
        emailLabel: "Or email us directly at:",
        form: {
          projectName: 'Project Name',
          email: 'Your Email',
          budget: 'Budget Range',
          budgetPlaceholder: 'Select an estimate...',
          projectType: 'Project Type',
          message: 'Message Details',
          messagePlaceholder: 'Tell us about the features, timeline, and goals...',
          send: 'Send Request',
          types: ['Web App', 'Mobile App', 'UI/UX Design', 'Custom System']
        },
        success: {
          title: 'Request Received',
          desc: 'Thank you! Our technical lead will review your details and reach out within 24 hours.',
          another: 'Send Another Request'
        }
      },
      footer: {
        brandDesc: "Engineering effortless digital experiences. We design, architect, and deliver premium software solutions for growing enterprises worldwide.",
        caps: "Capabilities",
        company: "Company",
        links: {
          web: "Web Engineering",
          mobile: "Mobile Architecture",
          ai: "AI & SaaS Logic",
          ui: "UI/UX Polish",
          about: "About Us",
          work: "Our Work",
          process: "Our Process"
        },
        bottom: {
          rights: "All rights reserved.",
          privacy: "Privacy Policy",
          terms: "Terms of Service"
        }
      }
    },
    ar: {
      nav: {
        home: 'الرئيسية',
        about: 'من نحن',
        services: 'خدماتنا',
        work: 'أعمالنا',
        projects: 'المشاريع',
        contact: 'اتصل بنا'
      },
      hero: {
        welcome: "كود سكوير",
        headline: ['نحن', 'نُهندس', 'حلولاً', 'رقمية', 'مبتكرة', 'تُعيد', 'صياغة', 'مستقبل', 'أعمالك'],
        sub: "نحن مهندسو أنظمة نبني حلولاً رقمية فائقة الجودة تدفع حدود الممكن وتُشكّل مستقبل أعمالك.",
        cta: "ابدأ رحلة الابتكار"
      },
      services: {
        title: "تخصصاتنا الهندسية",
        subtitle: "تصميم هيكلي من أجل التوسع والأداء العالي",
        explore: "استكشف",
        items: {
          mobile: {
            title: 'تطبيقات الجوال (Mobile)',
            desc: 'تطبيقات أصلية (Native) وعابرة للمنصات بنظامي Android و iOS نُهندسها لتعمل بسرعة فائقة وأداء انسيابي.',
            features: ['Flutter', 'React Native', 'Swift']
          },
          web: {
            title: 'تطوير الويب (Web)',
            desc: 'بناء تطبيقات ويب متطورة وقابلة للتوسع باستخدام أحدث الأطر البرمجية، من النماذج الأولية إلى الأنظمة المؤسسية.',
            features: ['React', 'Angular', 'Node.js', 'AWS']
          },
          saas: {
            title: 'أنظمة SaaS المخصصة',
            desc: 'منصات سحابية متعددة المستأجرين مصممة للنمو السريع مع دمج أنظمة الفوترة وإدارة المستخدمين المتقدمة.',
            features: ['Multi-tenant Logic', 'Stripe Integration']
          },
          ai: {
            title: 'حلول الذكاء الاصطناعي (AI)',
            desc: 'أنظمة أتمتة ذكية لرفع كفاءة سير العمل. ندمج نماذج LLM المتطورة مباشرة في قنوات البيانات الخاصة بك.',
            features: ['Machine Learning', 'RAG Pipelines', 'OpenAI APIs']
          },
          ui: {
            title: 'تصميم الـ UI/UX',
            desc: 'واجهات تجمع بين الجمالية الفائقة وسهولة الاستخدام المطلقة، تهدف للحفاظ على كثافة تفاعل المستخدمين.',
            features: ['Figma Prototyping', 'User Research']
          },
          system: {
            title: 'تكامل الأنظمة (IoT)',
            desc: 'ربط مصفوفات الـ IoT والأنظمة الذكية، وتوحيد نقاط النهاية في لوحات تحكم مركزية لمراقبة الأداء لحظياً.',
            features: ['IoT protocols', 'API Gateways', 'Docker']
          },
          support: {
            title: 'الدعم والصيانة',
            desc: 'صيانة ما بعد الإطلاق لضمان استمرارية الأداء الفائق والسرعة الرقمية القصوى مع مراقبة السيرفرات عالمياً.',
            features: ['24/7 Monitoring', 'SLA Guarantees', 'CI/CD']
          }
        }
      },
      vision: {
        vision_title: "رؤيتنا",
        vision_desc: "أن نكون المعيار العالمي للتميز الهندسي، حيث البرمجيات ليست مجرد كود، بل تحفة معمارية رقمية متكاملة.",
        mission_title: "مهمتنا",
        mission_desc: "تمكين المؤسسات من خلال هندسة أنظمة رقمية قوية تدفع النمو المستدام وتتفوق على تطلعات المستخدمين.",
        badge: "النواة الاستراتيجية"
      },
      about: {
        title: "ما وراء السطور",
        quote: "نحن لا نبني برمجيات فحسب... بل نُهندس حلولاً قابلة للتوسع تُعيد صياغة أسس القطاعات.",
        secondary: "يعمل فريقنا من النخبة في الهندسة والتصميم على صياغة تجارب رقمية تترك أثراً دائماً."
      },
      process: {
        title: "المنهجية",
        steps: [
          { title: 'التأسيس', description: 'استكشاف استراتيجي لفهم الرؤية، الأهداف، ورسم خارطة الطريق للمتطلبات التقنية.', align: 'left' },
          { title: 'المعمارية', description: 'تصميم مخططات هيكلية متينة مصممة للتوسع والأداء المثالي تحت أقصى ضغط.', align: 'right' },
          { title: 'الهندسة', description: 'بناء المشاريع بدقة هندسية، مع الاستفادة من أحدث أطر العمل وأفضل الممارسات البرمجية العالمية.', align: 'left' },
          { title: 'الإطلاق والتطوير', description: 'خطوط إمداد انسيابية للإطلاق متبوعة بحلقات تحسين وتطوير مستمرة.', align: 'right' }
        ]
      },
      philosophy: {
        title: "فلسفتنا",
        body: "كل مشروع هو حالة فريدة، وكل شركة تمتلك هوية مختلفة. لهذا السبب نبدأ بفهم عميق لاحتياجاتك بدلاً من القوالب الجاهزة. نحلل متطلباتك، ونفهم أهدافك، ونُهندس حلولاً تنمو مع نمو أعمالك.",
        pillars: [
          "لا نطارد الصيحات العابرة؛ بل نبني أسساً تدوم طويلاً.",
          "لسنا مجرد مبرمجين؛ نحن مهندسو أنظمة برمجية قابلة للتوسع.",
          "لسنا مجرد مزودي خدمة؛ نحن شريكك التكنولوجي الاستراتيجي."
        ]
      },
      strengths: {
         title: "لماذا كود سكوير؟",
         subtitle: "8 أسباب تميزنا عن الآخرين",
         items: [
           { title: "فهم عميق للأعمال", desc: "نحلل قواعد عملك بدقة هندسية قبل كتابة أول سطر من الكود." },
           { title: "حلول مخصصة وقابلة للتوسع", desc: "لا قوالب جاهزة هنا. كل حل يُبنى خصيصاً ليتحمل الكثافة المرورية المتزايدة." },
           { title: "الالتزام بالمواعيد", desc: "نستخدم منهجية Agile صارمة تضمن مواءمة التطوير مع جدولك الزمني للسوق." },
           { title: "دعم فني مستمر", desc: "صيانة ما بعد الإطلاق تضمن استقرار النظام والحفاظ على الزخم الرقمي." },
           { title: "تفكير استراتيجي", desc: "نعمل ضمن أطر عمل تفاعلية تهدف للابتكار في كافة القطاعات الرقمية." },
           { title: "تصميم UI/UX عالمي", desc: "تصميمات تضاهي معايير Awwwards العالمية لضمان ولاء المستخدمين." },
           { title: "عقلية الشراكة", desc: "تكامل عميق مع فريقك للعمل كذراع تقني استراتيجي (Outsourced CTO)." },
           { title: "تنفيذ فائق الكفاءة", desc: "خطوط تفاعل CI/CD انسيابية تتيح دورات بناء واختبار سريعة للغاية." }
         ]
      },
      projects: {
        title: "أعمال مختارة",
        subtitle: "مشاريع تُعيد صياغة معايير القطاعات",
        status: { progress: 'قيد التنفيذ', updating: 'تحديثات جارية', idea: 'فكرة', live: 'مباشر' },
        types: { internal: 'مشروع داخلي', product: 'منتج خاص', saas: 'نظام SaaS', b2b: 'نظام B2B', b2bweb: 'تطبيق ويب B2B', b2g: 'مشروع حكومي B2G' },
        items: [
          { title: 'موقع M Tech Square', desc: 'موقع مؤسسي يستعرض النظام البيئي التكنولوجي للمجموعة برسوم متحركة سينمائية.' },
          { title: 'منصة Techno Square', desc: 'منصة تعليمية مع تطبيق جوال متكامل لبرامج التعلم عبر الإنترنت الخاصة بتكنو سكوير.' },
          { title: 'سلسلة Dr. X', desc: 'منصة SaaS للإدارة الصحية، تشمل ملفات المرضى وتحليلات تشخيصية مدعومة بالذكاء الاصطناعي AI.' },
          { title: 'نظام El Shoush للسفر', desc: 'نظام شامل لحجز وإدارة السفر للوكالات، يدعم لغات متعددة وتكامل الخرائط (Maps API).' },
          { title: 'وكالة Osama Sakr', desc: 'منصة لإدارة الوكالات تشمل التوظيف، تتبع المشاريع، ولوحات تحليلات لحظية لمراقبة الأداء.' },
          { title: 'تطبيق السياحة في بورسعيد', desc: 'تجربة سياحية رقمية مدعومة من الحكومة لمدينة بورسعيد، تهدف لتعزيز السياحة.' }
        ]
      },
      cta: {
        pitch: "لنقم ببناء شيء استثنائي معاً.",
        sub: "سواء كنت بحاجة إلى تطبيق ويب عالي الأداء، أو تجربة جوال أصلية (Native)، أو نظام مؤسسي معقد؛ نحن جاهزون لهندسته.",
        emailLabel: "أو تواصل معنا عبر البريد المباشر:",
        form: {
          projectName: 'اسم المشروع',
          email: 'بريدك الإلكتروني',
          budget: 'ميزانية المشروع',
          budgetPlaceholder: 'اختر تقديراً للميزانية...',
          projectType: 'نوع المشروع',
          message: 'تفاصيل الرسالة',
          messagePlaceholder: 'أخبرنا عن الميزات المطلوبة، الجدول الزمني، والأهداف...',
          send: 'إرسال الطلب',
          types: ['تطبيق ويب (Web)', 'تطبيق جوال (Mobile)', 'تصميم UI/UX', 'نظام مخصص']
        },
        success: {
          title: 'تم استلام طلبك بنجاح',
          desc: 'شكراً لك! سيقوم فريقنا التقني بمراجعة التفاصيل والتواصل معك خلال 24 ساعة.',
          another: 'إرسال طلب آخر'
        }
      },
      footer: {
        brandDesc: "نُهندس تجارب رقمية انسيابية وفائقة الجودة. نصمم ونبني ونقدم حلولاً برمجية متميزة للشركات المتنامية حول العالم.",
        caps: "القدرات",
        company: "الشركة",
        links: {
          web: "هندسة الويب",
          mobile: "معمارية الجوال",
          ai: "ذكاء اصطناعي و SaaS",
          ui: "تصميم UI/UX",
          about: "من نحن",
          work: "أعمالنا",
          process: "منهجيتنا"
        },
        bottom: {
          rights: "جميع الحقوق محفوظة.",
          privacy: "سياسة الخصوصية",
          terms: "شروط الخدمة"
        }
      }
    }
  };

  constructor() {}

  setLanguage(lang: Lang) {
    this.lang.set(lang);
  }

  toggleLanguage() {
    this.lang.set(this.lang() === 'en' ? 'ar' : 'en');
  }

  getTranslations(section?: string) {
    return computed(() => {
      const trans = this.dictionary[this.lang()];
      return section ? trans[section] : trans;
    });
  }
}
