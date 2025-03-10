import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Form = ({
  post,
  type,
  setPost,
  submitting,
  handleSubmit,
}) => {

  const { data: session } = useSession();


  return (
    <section className="w-full max-w-full flex start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world,
        and let your imagination run wild with any
        AI-powered platform
      </p>

      {session?.user ? (<form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'

      >
        <label>

          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your prompt here...'
            className='form_textarea'
          />
        </label>

        <label>

          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag
            <span
              className='font-normal'
            > (#product, #web_development, #idea )</span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder='#tag'
            className='form_input'
          />
        </label>


        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
            type='submit'
            disabled={submitting}
          >
            {submitting ? `${type} ...` : type}
          </button>
        </div>

      </form>)
        :
        (
          <div
            className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism '
          >
            <h1>You have to be logged in</h1>
          </div>
        )
      }

    </section>
  )
}

export default Form