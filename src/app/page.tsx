import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Feature {
  title: string;
  description:
    string;
  icon: string;
}

export default function Home() {
  const features: Feature[] = [
    {
      title: "Reliable Infrastructure",
      description:
        "Our nodes are built on robust infrastructure to ensure 99.9% uptime.",
      icon: "/Infrastructure.svg",
    },
    {
      title: "Scalable Solutions",
      description: "From startups to enterprises, we scale with your needs.",
      icon: "/Scalable.svg",
    },
    {
      title: "Secure & Private",
      description:
        "Advanced encryption and data protection to keep your information safe.",
      icon: "/security.svg",
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section className="relative w-full text-center min-h-[70vh] py-8 md:py-16 px-4">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,_var(--tw-gradient-stops))] from-primary/20 via-background/50 to-background opacity-100 mix-blend-normal flex flex-col justify-center">
            <div className="relative z-10 max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6">
                Deploy <span className="text-primary">XRP Nodes</span> Easily
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8">
                Run XRP nodes in one click.
                <br className="hidden md:block" />
                We provide scalable rippled nodes on cloud.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full md:w-auto shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
                >
                  <Link href="#get-started">Get Started</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full md:w-auto hover:bg-primary/5"
                >
                  <Link href="#learn-more">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-16 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group border border-primary/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/20"
                >
                  <CardHeader>
                    <div className="mb-4">
                      <div
                        className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center
                        group-hover:bg-primary/20 transition-colors duration-200"
                      >
                        <div className="w-12 h-12">
                          <div className="w-full h-full relative dark:invert dark:brightness-100 transition-all duration-200">
                            <Image
                              src={feature.icon}
                              alt={feature.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-center">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="relative py-16 md:py-20 bg-gray-50 dark:bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">Pricing</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 text-center">
            From free to enterprise, we have plans that grow with you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <Card className="border border-primary/10 bg-white dark:bg-background p-6 rounded-lg">
                <CardHeader className="text-center">
                  <h3 className="text-xl font-bold">Free</h3>
                  <p className="text-primary text-2xl font-extrabold mt-2">$0</p>
                  <p className="text-muted-foreground mt-2">Perfect for small projects and testing.</p>
                </CardHeader>
                <CardContent className="mt-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li>1 Node</li>
                    <li>2 GB RAM</li>
                    <li>Community Support</li>
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className="mt-6 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 w-full"
                  >
                    <Link href="/node">Start Now</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border border-primary/10 bg-white dark:bg-background p-6 rounded-lg">
                <CardHeader className="text-center">
                  <h3 className="text-xl font-bold">Personal</h3>
                  <p className="text-primary text-2xl font-extrabold mt-2">$19</p>
                  <p className="text-muted-foreground mt-2">Great for individual developers.</p>
                </CardHeader>
                <CardContent className="mt-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li>2 Nodes</li>
                    <li>4 GB RAM</li>
                    <li>Email Support</li>
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className="mt-6 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 w-full"
                  >
                    <Link href="#contact">Contact Us for Pricing</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border border-primary/10 bg-white dark:bg-background p-6 rounded-lg">
                <CardHeader className="text-center">
                  <h3 className="text-xl font-bold">Business</h3>
                  <p className="text-primary text-2xl font-extrabold mt-2">$69</p>
                  <p className="text-muted-foreground mt-2">Ideal for teams and enterprises.</p>
                </CardHeader>
                <CardContent className="mt-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li>5 Nodes</li>
                    <li>16 GB RAM</li>
                    <li>Priority Support</li>
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className="mt-6 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 w-full"
                  >
                    <Link href="#contact">Contact Us for Pricing</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-16 md:py-20 bg-gray-50 dark:bg-background">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Contact Us</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Reach out to us for inquiries, support, or partnerships. Visit us at
              <a
                href="https://new.polichain.xyz/en/"
                className="text-primary underline ml-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                our contact page
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
