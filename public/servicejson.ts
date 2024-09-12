export const services = {
  "services": [
    {
      "name": "Cloud Solutions & DevOps",
      "description": "Cloud infrastructure setup, DevOps automation, and scalable cloud migrations.",
      "cost": "$3000 - $50,000",
      "features": [
        "Cloud setup (AWS, Azure, Google Cloud)",
        "CI/CD pipeline setup",
        "Cloud migration"
      ]
    },
    {
      "name": "Digital Transformation Consulting",
      "description": "Strategic consulting to help businesses leverage cutting-edge technologies and automate processes.",
      "cost": "$2000 - $25,000",
      "features": [
        "Business process automation",
        "Technology modernization",
        "Custom digital strategies"
      ]
    },
    {
      "name": "Mobile App Development",
      "description": "Native and cross-platform mobile app development with a focus on performance and user experience.",
      "cost": "$5000 - $70,000",
      "features": [
        "iOS and Android app development",
        "React Native, Flutter apps",
        "App lifecycle management"
      ]
    },
    {
      "name": "AI & Machine Learning Solutions",
      "description": "Data-driven AI solutions and machine learning models tailored to your business.",
      "cost": "$8000 - $60,000",
      "features": [
        "Predictive models",
        "NLP and image recognition",
        "Machine learning algorithm development"
      ]
    },
    {
      "name": "Blockchain Development",
      "description": "Development of secure blockchain applications, smart contracts, and DApps.",
      "cost": "$10,000 - $100,000",
      "features": [
        "Smart contract implementation",
        "Blockchain app development",
        "Tokenization"
      ]
    },
    {
      "name": "UI/UX Design",
      "description": "User-centric design and optimization for web and mobile platforms.",
      "cost": "$2000 - $30,000",
      "features": [
        "Wireframing and prototyping",
        "Usability testing",
        "Custom interface design"
      ]
    },
    {
      "name": "Cybersecurity Solutions",
      "description": "Comprehensive security solutions to protect your data and systems.",
      "cost": "$5000 - $50,000",
      "features": [
        "Security audits",
        "Threat detection and response",
        "Compliance consulting"
      ]
    },
    {
      "name": "E-commerce Development",
      "description": "Custom e-commerce platforms with secure payment integrations.",
      "cost": "$3000 - $40,000",
      "features": [
        "Custom e-commerce platform",
        "Payment gateway integrations",
        "Scalable shopping experiences"
      ]
    },
    {
      "name": "Data Analytics & Business Intelligence",
      "description": "Advanced data visualization and predictive analytics to support decision-making.",
      "cost": "$4000 - $30,000",
      "features": [
        "Data visualization",
        "Predictive analytics",
        "Data warehousing"
      ]
    },
    {
      "name": "IoT (Internet of Things) Solutions",
      "description": "Smart device integration and connected systems for various industries.",
      "cost": "$5000 - $70,000",
      "features": [
        "IoT platform development",
        "Sensor data analysis",
        "Automation and control systems"
      ]
    },
    {
      "name": "IT Support & Maintenance",
      "description": "24/7 monitoring, proactive maintenance, and IT support services.",
      "cost": "$1000 - $15,000",
      "features": [
        "24/7 monitoring",
        "System updates and troubleshooting",
        "Infrastructure management"
      ]
    }
  ],
  "custom_service":  {
      "name": "Custom Software Development",
      "plans": [
        {
          "plan_name": "Basic Plan",
          "cost": {
            "min": 5000,
            "max": 15000
          },
          "description": "Standard web or mobile application with limited features and basic user interface.",
          "features": [
            "Limited features",
            "Basic UI/UX",
            "Minimal third-party integrations",
            "1-2 months delivery time",
            "1 month post-launch support"
          ]
        },
        {
          "plan_name": "Advanced Plan",
          "cost": {
            "min": 15000,
            "max": 50000
          },
          "description": "Fully customized software tailored to business needs with multiple features and advanced integrations.",
          "features": [
            "Custom UI/UX design",
            "Advanced integrations",
            "3-6 months delivery time",
            "6 months post-launch support"
          ]
        },
        {
          "plan_name": "Enterprise Plan",
          "cost": {
            "min": 50000,
            "max": 100000
          },
          "description": "Large-scale, highly scalable software with advanced security, integrations, and performance optimization.",
          "features": [
            "Highly scalable software",
            "Advanced security and performance optimization",
            "Dedicated team with senior developers",
            "6+ months delivery time",
            "1-year ongoing maintenance and support"
          ]
        }
      ],
      "dynamic_pricing": {
        "base_rate": 5000,
        "complexity_multiplier": {
          "medium_complexity": 1.5,
          "high_complexity": 2
        },
        "additional_features": {
          "description": "Cost per additional feature (e.g., payment gateway, user authentication).",
          "cost_per_feature": 2000
        },
        "support_and_maintenance": {
          "description": "Annual support and maintenance fees.",
          "cost_range": {
            "min": 1000,
            "max": 5000
          }
        },
        "formula": "Final Cost = Base Rate * Complexity Multiplier + (Additional Features * Cost Per Feature) + Support & Maintenance"
      }
    },
    "testimonials" : [
  {
    name: "John Doe",
    company: "Tech Innovators",
    testimonial:
      "The team at Venture Buddy delivered a fantastic product. Their custom software development expertise exceeded our expectations, and their support throughout the project was exemplary.",
  },
  {
    name: "Jane Smith",
    company: "Creative Solutions",
    testimonial:
      "Venture Buddy's IT consulting services transformed our business. Their insights and technical knowledge were instrumental in our successful digital transformation.",
  },
  {
    name: "Michael Johnson",
    company: "NextGen Tech",
    testimonial:
      "Exceptional service from start to finish. The cloud solutions provided by Venture Buddy were tailored perfectly to our needs and have significantly improved our operational efficiency.",
  },
  {
    name: "Jane Smith",
    company: "Creative Solutions",
    testimonial:
      "Venture Buddy's IT consulting services transformed our business. Their insights and technical knowledge were instrumental in our successful digital transformation.",
  },
  {
    name: "Michael Johnson",
    company: "NextGen Tech",
    testimonial:
      "Exceptional service from start to finish. The cloud solutions provided by Venture Buddy were tailored perfectly to our needs and have significantly improved our operational efficiency.",
  },
]
}
