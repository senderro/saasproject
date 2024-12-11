import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full text-center py-8 md:py-16 px-4 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-gray-900 dark:text-white">
          Deploy <span className="text-indigo-600 dark:text-indigo-400">XRP Nodes</span> Easily
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 md:mb-8">
          Run XRP nodes in one click.
          <br className="hidden md:block" />
          We provide scalable rippled nodes on cloud.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <Link
            href="#get-started"
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-full text-base md:text-lg font-medium shadow-lg transition duration-200"
          >
            Get Started
          </Link>
          <Link
            href="#learn-more"
            className="w-full md:w-auto border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-600 dark:text-gray-300 px-6 py-3 rounded-full text-base md:text-lg font-medium transition duration-200"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 w-full">
        <div className="container mx-auto px-4 md:px-6">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 md:mb-12">
            Why Choose XRPlataform
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg text-center shadow-lg transition duration-200">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center rounded-full">
                  <Image
                    src="/Infrastructure.svg"
                    alt="Reliable Infrastructure"
                    width={48}
                    height={48}
                    className="dark:invert"
                  />
                </div>
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Reliable Infrastructure
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Our nodes are built on robust infrastructure to ensure 99.9% uptime.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg text-center shadow-lg transition duration-200">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center rounded-full">
                  <Image
                    src="/Scalable.svg"
                    alt="Scalable Solutions"
                    width={48}
                    height={48}
                    className="dark:invert"
                  />
                </div>
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Scalable Solutions
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                From startups to enterprises, we scale with your needs.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg text-center shadow-lg transition duration-200">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center rounded-full">
                  <Image
                    src="/security.svg"
                    alt="Secure and Private"
                    width={48}
                    height={48}
                    className="dark:invert"
                  />
                </div>
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Secure & Private
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced encryption and data protection to keep your information safe.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}