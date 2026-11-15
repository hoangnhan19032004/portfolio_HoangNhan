export type Locale = "vi" | "en";

export type Project = {
  slug: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn: string;
  caseStudy: {
    context: { vi: string; en: string };
    approach: { vi: string; en: string };
    highlights: { vi: string[]; en: string[] };
  };
  tech: string[];
  image: string;
  links: { demo: string; source: string };
};

export const PROJECTS: Project[] = [
  {
    slug: "swebi-coffee",
    title: "Swebi Coffee – E-Commerce",
    description:
      "Website bán cà phê & trà với giỏ hàng, thanh toán, phân quyền Admin/Staff, tối ưu SEO & Core Web Vitals.",
    descriptionEn:
      "A coffee and tea e-commerce website with cart, checkout, Admin/Staff roles, SEO, and Core Web Vitals optimizations.",
    caseStudy: {
      context: {
        vi: "Tạo một kênh bán cà phê và trà trực tuyến, đồng thời hỗ trợ nhân sự quản trị vận hành cửa hàng.",
        en: "Create an online channel for selling coffee and tea while supporting the staff who manage store operations.",
      },
      approach: {
        vi: "Xây dựng luồng mua hàng gồm giỏ hàng và thanh toán, kết hợp phân quyền Admin/Staff cho các nghiệp vụ quản trị.",
        en: "Build a shopping flow with a cart and checkout, alongside Admin/Staff roles for store-management workflows.",
      },
      highlights: {
        vi: ["Giỏ hàng và quy trình thanh toán", "Phân quyền Admin/Staff", "Tập trung tối ưu SEO và Core Web Vitals"],
        en: ["Shopping cart and checkout flow", "Admin/Staff role management", "Focus on SEO and Core Web Vitals optimization"],
      },
    },
    tech: [
      "ASP.NET Core",
      "Entity Framework Core",
      "SQL Server",
      "Razor View",
      "Bootstrap",
      "jQuery",
    ],
    image: "/projects/Swebi.jpg",
    links: {
      demo: "https://drive.google.com/file/d/1svqI6pNCVDE5u8Px6Jvi8_MHWq0oJHN_/view?usp=sharing",
      source: "https://github.com/hoangnhan19032004/Web_CuaHangCafe_MainSwebi",
    },
  },
  {
    slug: "htsalon-booking",
    title: "HTSALON – Đặt lịch cắt tóc",
    titleEn: "HTSALON – Haircut Booking",
    description:
      "Hệ thống đặt lịch salon: quản lý dịch vụ, lịch hẹn, hoá đơn, phân quyền, biểu đồ báo cáo.",
    descriptionEn:
      "A salon booking system with service, appointment, invoice, and role management, plus reporting dashboards.",
    caseStudy: {
      context: {
        vi: "Bài toán đặt lịch salon cần kết nối trải nghiệm đặt hẹn với các công việc quản lý dịch vụ, hóa đơn và nhân sự.",
        en: "Salon booking needs to connect appointment scheduling with service, invoice, and staff management.",
      },
      approach: {
        vi: "Phát triển ứng dụng web React và TypeScript, đưa lịch hẹn cùng các nghiệp vụ quản lý và báo cáo vào một hệ thống.",
        en: "Develop a React and TypeScript web app that brings appointments, management workflows, and reporting into one system.",
      },
      highlights: {
        vi: ["Quản lý dịch vụ, lịch hẹn và hóa đơn", "Phân quyền người dùng", "Biểu đồ báo cáo"],
        en: ["Service, appointment, and invoice management", "User roles and permissions", "Reporting dashboards"],
      },
    },
    tech: ["React", "TypeScript", "Node.js", "Express", "Tailwind", "Netlify"],
    image: "/projects/Hairsalon.jpg",
    links: {
      demo: "https://drive.google.com/file/d/1Vb7VuIh38ISjFZrqWcGrNMTNB0d0aw52/view?usp=sharing",
      source: "https://github.com/hoangnhan19032004/hair-salon-site-main",
    },
  },
  {
    slug: "galaxy-playground",
    title: "Galaxy Playground – Three.js",
    description:
      "Hiệu ứng dải Ngân Hà tương tác: WebGL, tối ưu hiệu suất, tương thích di động, Sử dụng không gian 3D.",
    descriptionEn:
      "An interactive galaxy experience built with WebGL and 3D, optimized for performance and mobile devices.",
    caseStudy: {
      context: {
        vi: "Tạo trải nghiệm trực quan về dải Ngân Hà, nơi người xem có thể khám phá không gian 3D ngay trên trình duyệt.",
        en: "Create a visual galaxy experience that lets visitors explore a 3D scene in the browser.",
      },
      approach: {
        vi: "Sử dụng Three.js và WebGL để dựng cảnh tương tác, đồng thời chú trọng hiệu năng và khả năng sử dụng trên thiết bị di động.",
        en: "Use Three.js and WebGL to build an interactive scene, with attention to performance and mobile usability.",
      },
      highlights: {
        vi: ["Không gian 3D tương tác", "Đồ họa WebGL với Three.js", "Tối ưu hiệu suất và tương thích di động"],
        en: ["Interactive 3D scene", "WebGL graphics with Three.js", "Performance optimization and mobile support"],
      },
    },
    tech: ["Three.js", "HTML", "WebGL"],
    image: "/projects/Galaxy.png",
    links: {
      demo: "https://hoangnhan19032004.github.io/Galaxylovemain_HN-main/",
      source: "https://github.com/hoangnhan19032004/Galaxylovemain_HN-main",
    },
  },
  {
    slug: "salon-booking-app",
    title: "Salon Booking App",
    description:
      "Ứng dụng Flutter đặt lịch salon với giao diện sạch, hiện đại. Hỗ trợ các chức năng đặt lịch và xác thực Firebase.",
    descriptionEn:
      "A clean, modern Flutter salon booking app with appointment scheduling and Firebase authentication.",
    caseStudy: {
      context: {
        vi: "Đưa quy trình đặt lịch salon lên thiết bị di động với giao diện gọn gàng, dễ sử dụng.",
        en: "Bring salon appointment booking to mobile devices through a clean, approachable interface.",
      },
      approach: {
        vi: "Xây dựng ứng dụng bằng Flutter, kết hợp chức năng đặt lịch với xác thực Firebase.",
        en: "Build the app with Flutter and combine appointment scheduling with Firebase authentication.",
      },
      highlights: {
        vi: ["Ứng dụng đa nền tảng với Flutter", "Luồng đặt lịch salon", "Xác thực người dùng bằng Firebase"],
        en: ["Cross-platform app built with Flutter", "Salon appointment booking flow", "Firebase user authentication"],
      },
    },
    tech: ["Flutter", "Firebase", "Dart"],
    image: "/projects/Salonbookingapp.png",
    links: {
      demo: "https://drive.google.com/file/d/1h8ZUrNkR_SlItjHX4-c4tJbyuUaZ_UNW/view?usp=sharing",
      source: "https://github.com/hoangnhan19032004/salon_app-admin-with-adminlogin-fixed2",
    },
  },
  {
    slug: "ebook-store",
    title: "EBook-Store App",
    description:
      "Ứng dụng mua sắm sách điện tử với trải nghiệm tối ưu, thanh toán Momo/VNPay và hệ thống quản lý đơn hàng.",
    descriptionEn:
      "An e-book shopping app with an optimized user experience, MoMo/VNPay payments, and order management.",
    caseStudy: {
      context: {
        vi: "Xây dựng trải nghiệm mua sách điện tử đi cùng quy trình thanh toán và theo dõi đơn hàng.",
        en: "Build an e-book shopping experience connected to payment and order-tracking workflows.",
      },
      approach: {
        vi: "Tổ chức ứng dụng theo mô hình MVC, tích hợp API và các phương thức thanh toán MoMo/VNPay cùng nghiệp vụ quản lý đơn hàng.",
        en: "Structure the app with MVC, integrate APIs and MoMo/VNPay payments, and support order-management workflows.",
      },
      highlights: {
        vi: ["Thanh toán MoMo và VNPay", "Quản lý đơn hàng", "Tích hợp API và SQL Server"],
        en: ["MoMo and VNPay payments", "Order management", "API and SQL Server integration"],
      },
    },
    tech: ["MVC", "SQL Server", "API", "Momo", "VNPay"],
    image: "/projects/Ebook.png",
    links: {
      demo: "https://drive.google.com/file/d/1h5SRnNRjpdyS1dkL49w1dyaFZiBvdHVy/view?usp=sharing",
      source: "https://github.com/hoangnhan19032004/EBookStore-Project",
    },
  },
];

export function getProjectTitle(project: Project, locale: Locale) {
  return locale === "en" && project.titleEn ? project.titleEn : project.title;
}
