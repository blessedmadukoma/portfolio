import { LineIcon, PointedArrow } from "@/icons/icons";

const Contact = () => {
  return (
    <div className="text-start mx-6 md:mx-10">
      <h2 className="text-3xl font-semibold md:text-4xl pt-20 md:pt-40">
        Contact Me
      </h2>
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 bg-[#18173B] rounded-2xl my-6 p-4 md:p-8">
        <section className="hidden md:block text-end mr-10">
          <div className="">
            <div className="mx-auto text-end">
              <div>
                <h2 className="text-4xl tracking-widest font-bold text-[#5651dd]">
                  Madukoma{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#5651dd] via-[#6e6ad6] to-[#fafafa]">
                    Blessed
                  </span>
                </h2>
              </div>
              <div className="flex items-center justify-end">
                <LineIcon />
                <span className="ml-2 md:text-lg">Backend Engineer</span>
              </div>
            </div>
          </div>

          <div className="mt-20 tracking-wider font-extralight text-start text-lg">
            I am a software engineer with 3+ years of experience, tasked with
            <span className="text-[#6965D8]"> demystifying </span> the amazing
            world of scalable, performant systems by designing and developing
            high-quality backend services.
          </div>

          <div className="w-[200px] text-center mt-20">
            <a
              href="https://docs.google.com/document/d/151mUem2Jq3V_028rhx_ICpoDixSKmP_mkMTUZhzesWM/view"
              target="_blank"
            >
              <div className="border border-[#e6e6e6] rounded-[4px] p-4 font-medium text-sm md:text-base flex items-center justify-center hover:bg-gray-400 hover:animate-pulse hover:text-white">
                <span className="mr-2">View My Resume</span>{" "}
                <PointedArrow color="white" />
              </div>
            </a>
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <form
            className="flex flex-col"
            action="https://formspree.io/f/xnqoqjzq"
            method="POST"
          >
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-lg">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-2 border bg-[#0A092C] border-[#e6e6e6] rounded-[4px] p-4 font-medium text-sm md:text-base"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-2 border border-[#e6e6e6] rounded-[4px] p-4 font-medium bg-[#0A092C] text-sm md:text-base"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="subject" className="text-lg">
                  Subject
                </label>
                <input
                  type="subject"
                  name="subject"
                  id="subject"
                  className="mt-2 border border-[#e6e6e6] rounded-[4px] p-4 font-medium bg-[#0A092C] text-sm md:text-base"
                  placeholder="Enter your subject"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-lg">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  className="mt-2 bg-[#0A092C] border border-[#e6e6e6] rounded-[4px] p-4 font-medium text-sm md:text-base"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>

              <div className="flex flex-col">
                <button
                  type="submit"
                  className="mt-2 border border-[#e6e6e6] rounded-[4px] p-3 font-medium text-sm md:text-base flex items-center justify-center bg-white"
                >
                  <span className="mr-2 text-black">Send Message</span>{" "}
                  <PointedArrow color="black" />
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
