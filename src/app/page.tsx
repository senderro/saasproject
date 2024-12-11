import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full text-center py-8 md:py-16 px-4">
        <div className="relative">
          {/* Gradient background with new color system */}
          <div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"
            aria-hidden="true"
          />
          
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6">
              Deploy <span className="text-primary">XRP Nodes</span> Easily
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8">
              Run XRP nodes in one click.
              <br className="hidden md:block" />
              We provide scalable rippled nodes on cloud.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <Link
                href="#get-started"
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full 
                  font-medium shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                href="#learn-more"
                className="w-full md:w-auto border border-border hover:border-primary/20 text-foreground 
                  px-6 py-3 rounded-full font-medium transition-colors duration-200 hover:bg-primary/5"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Why Choose XRPlataform
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Feature Cards */}
            {[
              {
                title: "Reliable Infrastructure",
                description: "Our nodes are built on robust infrastructure to ensure 99.9% uptime.",
                icon: "/Infrastructure.svg"
              },
              {
                title: "Scalable Solutions",
                description: "From startups to enterprises, we scale with your needs.",
                icon: "/Scalable.svg"
              },
              {
                title: "Secure & Private",
                description: "Advanced encryption and data protection to keep your information safe.",
                icon: "/security.svg"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-card text-card-foreground p-6 rounded-lg transition-all duration-200
                  shadow-sm hover:shadow-md hover:-translate-y-1 border border-border hover:border-primary/20"
              >
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center
                    group-hover:bg-primary/20 transition-colors duration-200">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={48}
                      height={48}
                      className="text-primary group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                </div>
                <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}