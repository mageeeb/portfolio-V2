import { InlineCode } from "@/once-ui/components";
import TechnicalSkills from "@/components/TechnicalSkills";
// import { technicalSkills } from "@/app/resources/content";


const person = {
  firstName: "Magib",
  lastName: "Sall",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Developpeur Web Full Stack",
  avatar: "/images/avatar.png",
  location: "Europe/Brussels", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Français"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Souscrir à la Newsletter de {person.firstName} </>,
  description: (
    <>
      J'écris occasionnellement sur le design et la technologie, et je partage mes réflexions sur l'intersection de la
      créativité et de l'ingénierie.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/mageeeb",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/magib-sall-b45090129/",
  },
  {
    name: "FaXTwitter",
    icon: "FaXTwitter",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:example@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Bienvenue sur mon portfolio!</>,
  subline: (
    <>
      Je suis Magib sall <InlineCode>Web Développeur</InlineCode>, je suis un professionnel spécialisé
      <br /> dans la conception, le développement et la maintenance de sites et d’applications web.
    </>
  ),
};

const about = {
  label: "About",
  title: "A Propos de moi",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
        <>
          En tant que développeur web Full Stack, je conçois et développe des applications web
          en travaillant à la fois sur le Front-end (interface utilisateur) et le Back-end (serveur, base de données).
          <br/> <br/>

          Je gère l’ensemble du cycle de développement, de la conception à la mise en production,
          en assurant la cohérence et la performance du projet. <br/> <br/>

          Je collabore avec les équipes (souvent en méthodologie agile) et choisis les technologies adaptées
          aux besoins spécifiques. <br/> <br/>

          Polyvalent, je m’adapte aux exigences techniques et fonctionnelles pour livrer des solutions complètes
          et optimisées.
        </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Experience",
    experiences: [
      {
        company: "CF2m",
        timeframe: "2024 - Present",
        role: "Formateur Web Full-Stack",
        achievements: [
          <>
            J'enseigne tout ce qui est le développement web et la conception de sites web à travers les cours. j'utilise
            beaucoup de technologies comme React, Next.js, Figma, Tailwind CSS, Bootstrap, Symfony et bien d'autres.
          </>,
          <>
            J'enseigne aussi les réseaux utiliser pourle developpement web NGINX/Apache,Docker, Api. En même temps je travail
            sur des projets personnels et professionnels.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/2.png",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },

      {
        company: "Burotel Bruxelles",
        timeframe: "2024 - Present",
        role: "Developpeur Web Stagiaire",
        achievements: [
          <>
            Projet client fait avec symfony.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/2.png",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },

      {
        company: "APEEE Laken/Bruxelles",
        timeframe: "2020 - 2022",
        role: "Assistant manager service transport / Moniteur",
        achievements: [
          <>
            Gestion et suivi des accompagnateurs de bus.

          </>,
          <>
            Moniteur d'échecs et de basket-ball.
          </>,
        ],
        images: [],
      },

      {
        company: "INTELCIA / Dakar (Sénégal)",
        timeframe: "2018 - 2020",
        role: "Conseiller technique",
        achievements: [
          <>
            j'avais comme tâche d'apporter des solutions aux problèmes techniques liés au matériel et aux réseaux.
            En tant que conseiller technique, j'étais chargé de répondre aux appels entrants des clients qui ont des soucis technique.

          </>,

        ],
        images: [],
      },


      {
        company: "SENELEC (fournisseur d'électricité au Sénégal)",
        timeframe: "2017 - 2018",
        role: "Technicien informatique",
        achievements: [
          <>
            J'ai travaillé à la SENELEC (fournisseur d'électricité au Sénégal) pendant une année. Je m'occupais, en plus
            de la maintenance, l’installation et le réglage de la sécurité sur la plateforme de l’entreprise par Java qui
            sont des étapes cruciales pour garantir la protection des données et des informations sensibles.

          </>,
          <>
            En sachant que l'outil Java permet de contrôler les applications et les applets non sécurisés exécutés dans un navigateur Web.
          </>,
        ],
        images: [],
      },

      {
        company: "Technicien à la maintenance informatique",
        timeframe: "2014 - 2018",
        role: "MD INFORMATIQUE / Saint-Louis (Sénégal)",
        achievements: [
          <>
            J'ai travaillé pendant 3ans à MDinformatique, j'avais comme rôle l’installation de systèmes et de réseaux, ainsi
            que le dépannage et la réparation sur les parcs informatiques de nos partenaires tout en assurerant leurs bon
            fonctionnement Ainsi que la gestion de stock du matériel nformatique.
          </>,

        ],
        images: [],
      },
    ],
  },


  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Centre de formation CF2M à Bruxelles",
        description:
          <>Diplome professionnel de Web Full-Stack.</>,

      },
      {
        name: "Université Gaston Berger de Saint-Louis (Sénégal)",
        description: <>Formation en Maintenance informatique et initiation réseau par CISCO.</>,
      },

      {
        name: "Centre de formation MD Informatique (Sénégal)",
        description: <>Formation en maintenance hardware, software et réseaux.</>,
      },
    ],
  },
  technical: {
    title: "Les skills techniques",
    display: true, // Active ou non l'affichage de cette section
    skills: [
      {
        title: "Frontend",
        description: "Outils et technologies pour le développement frontend",
        icons: ["javascript", "html5", "css3","bootstrap", "wordpress", "symfony", "react", "nextjs", "figma", "photoshop"], // Correspond exactement aux clés de `iconLibrary`
      },
      {
        title: "Backend",
        description: "Outils et technologies backend",
        icons: ["nodejs", "mysql", "mariadb", "docker", "composer", "nextjs", "php"],
      },
    ],
  }
};

const blog = {
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

const mes_app = {
  label: "Mes Applications",
  title: "Mes Mini Applications",
  description: `Découvrez les mini applications créées par ${person.firstName}`,
  applications: [
    {
      title: "Calculatrice React",
      description: "Une calculatrice interactive développée avec React et styled-components",
      content: "Cette application permet d'effectuer des calculs mathématiques simples avec une interface moderne et responsive.",
      images: ["/images/gallery/2.png"],
      link: "https://calculator-react-app.example.com",
      avatars: [{ src: person.avatar }]
    },
    {
      title: "Todo List",
      description: "Application de gestion de tâches avec stockage local",
      content: "Organisez vos tâches quotidiennes avec cette application simple et efficace.",
      images: ["/images/gallery/3.png"],
      link: "https://todo-app.example.com",
      avatars: [{ src: person.avatar }]
    },
    {
      title: "Météo App",
      description: "Application météo utilisant l'API OpenWeatherMap",
      content: "Consultez la météo en temps réel pour n'importe quelle ville dans le monde.",
      images: ["/images/gallery/4.png"],
      link: "https://weather-app.example.com",
      avatars: [{ src: person.avatar }]
    },
    {
      title: "calendrier App",
      description: "Application de calendrier",
      content: "Consultez la météo en temps réel pour n'importe quelle ville dans le monde.",
      images: ["/images/gallery/5.jpg"],
      link: "/calendar",
      avatars: [{ src: person.avatar }]
    },
    {
      title: "Hasard",
      description: "Application pour sélectionner aléatoirement 2 groupes d'élèves",
      content: "Cette application choisit au hasard 2 groupes d'élèves (de 6 à 9 élèves au total).",
      images: ["/images/gallery/hasard.jpg"],
      link: "/hasard",
      avatars: [{ src: person.avatar }]
    }
  ]
};


export { person, social, newsletter, home, about, blog, work, gallery, mes_app };
