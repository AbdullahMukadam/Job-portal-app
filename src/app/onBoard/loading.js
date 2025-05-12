import SkeletonLoader from "@/utils/Job-list-skeleton/SkeletonLoader";



export default function Loading() {
    return (
        <div className='w-full h-full p-2'>
            <div className="space-y-4">
                <SkeletonLoader />
            </div>
        </div>
    )
}