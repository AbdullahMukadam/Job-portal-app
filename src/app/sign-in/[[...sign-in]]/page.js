import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='container mx-auto py-10 flex items-center justify-center'>
      <SignIn />
    </div>

  )
}