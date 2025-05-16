import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export function TableComponent({
    role,
    jobsData,
    hasApplied
}) {

    if (!hasApplied) {
        return (
            <h1 className="text-xl text-red-500 mt-2">No Availaible Data to show , Please Apply to Some Jobs or Add Some Jobs.</h1>
        )
    }
    return (
        <Table>
            <TableCaption>{role === "candidate" ? "A List of Applied Jobs" : "A List of Posted Jobs"}.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Job Id</TableHead>
                    <TableHead>Tittle</TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead className="text-right">Type</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {jobsData?.map((job) => (
                    <TableRow key={job.jobId}>
                        <TableCell className="font-medium" style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {job.jobId}
                        </TableCell>
                        <TableCell>{job.jobTitle}</TableCell>
                        <TableCell>{job.companyName}</TableCell>
                        <TableCell>{job.jobType}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
