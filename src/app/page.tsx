import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center">

      {/* Hero Section */}
      <section className="w-full text-center py-16 px-4 bg-gradient-to-br from-indigo-50 to-white">
        <h2 className="text-5xl font-extrabold mb-6">
          Deploy <span className="text-indigo-600">XRP Nodes</span> Easily
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Run XRP nodes in one click.
          <br />
          We provide scalable rippled nodes on cloud.
        </p>
        <div className="space-x-4">
          <Link
            href="#get-started"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg transition"
          >
            Get Started
          </Link>
          <Link
            href="#learn-more"
            className="border border-gray-300 hover:border-gray-400 text-gray-600 px-6 py-3 rounded-full text-lg font-medium transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50 w-full">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose XRPlataform
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card */}
            <div className="bg-white p-6 rounded-lg text-center shadow-lg">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-indigo-100 flex items-center justify-center rounded-full">
                  <Image
                    src="/Infrastructure.svg"
                    alt="Reliable Infrastructure"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <h4 className="text-lg font-bold mb-2">Reliable Infrastructure</h4>
              <p className="text-gray-600">
                Our nodes are built on robust infrastructure to ensure 99.9% uptime.
              </p>
            </div>

            {/* Feature Card */}
            <div className="bg-white p-6 rounded-lg text-center shadow-lg">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-indigo-100 flex items-center justify-center rounded-full">
                  <Image
                    src="/Scalable.svg"
                    alt="Scalable Solutions"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <h4 className="text-lg font-bold mb-2">Scalable Solutions</h4>
              <p className="text-gray-600">
                From startups to enterprises, we scale with your needs.
              </p>
            </div>

            {/* Feature Card */}
            <div className="bg-white p-6 rounded-lg text-center shadow-lg">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-indigo-100 flex items-center justify-center rounded-full">
                  <Image
                    src="/security.svg"
                    alt="Secure and Private"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <h4 className="text-lg font-bold mb-2">Secure & Private</h4>
              <p className="text-gray-600">
                Advanced encryption and data protection to keep your information safe.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
