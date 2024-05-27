import Image from 'next/image';
import { } from 'tailwindcss/colors';
import { Button } from '../Button';

function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export type CardProps = {
    status: "expired" | "active" | "pending",
    dateStart: string,
    dateEnd: string,
    flag: string,
    country: string,
    plan: string,
    comsuption: {
        totalComsumption: number,
    },
}

export const Card = ({ status, country, dateStart, dateEnd, plan, comsuption, flag }: CardProps) => {
    const color: Record<CardProps['status'], any> = {
        expired: {
            bg: "bg-gray-200",
            text: "text-gray-600"
        },
        pending: {
            bg: "bg-orange-200",
            text: "text-orange-600"
        },
        active: {
            bg: "bg-blue-200",
            text: "text-blue-600"
        }
    }

    const statusText: Record<CardProps['status'], string> = {
        active: "Active",
        pending: "Pending",
        expired: "Expired"
    }

    return (
        <div className="w-[320px] rounded-2xl border border-gray-200 shadow-xl p-4 bg-white flex flex-col justify-between">
            <div className="flex">
                <div className="gap-y-2 flex flex-col">
                    <div className={`w-[120px] ${color[status].bg} rounded-2xl flex items-center`}>
                        <div className="relative w-[30px] border-2 border-white h-[30px] bg-white rounded-full mr-2 overflow-hidden">
                            <Image src={flag} alt="country flag" fill objectFit="cover" />
                        </div>
                        <div className={color[status].text}>{statusText[status]}</div>
                    </div>
                    <div className="text-black font-bold">{country}</div>
                    <div className="text-black">{dateStart} - {dateEnd}</div>
                    <div className="text-black">{plan}</div>
                </div>
                {status !== "expired" && <div className="text-black ml-auto">{formatBytes(comsuption.totalComsumption)}</div>}
            </div>
            <div className="mt-8">
                {status === "pending"
                    ? <Button color="red" loading={false}>View details and install</Button>
                    : status === "active" ? (
                        <div className="flex flex-col gap-4">
                            <Button color="white" loading={false}>View details</Button>
                            <Button color="green" loading={false}>Add more data</Button>
                        </div>
                    ) : null}
            </div>
        </div>
    )
}