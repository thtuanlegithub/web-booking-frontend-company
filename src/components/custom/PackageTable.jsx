import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import '../styles/Table.css';

function PackageTable(props) {
    const TABLE_HEADS = props.tableHeads;
    const TABLE_ROWS = props.tableRows;
    return (
        <table className="package-table mt-4 w-full min-w-max table-auto text-left">
            <thead>
                <tr>
                    {TABLE_HEADS.map((head, index) => (
                        <th
                            key={head}
                            className="cursor-pointer border-y border-blue-gray-100 p-4 transition-colors hover:bg-blue-50"
                        >
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="text-md flex items-center justify-between gap-2 font-semibold leading-none heading-color"
                            >
                                {head}
                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                            </Typography>
                        </th>
                    ))}
                    <th
                        className="cursor-pointer border-y border-blue-gray-100  p-4 transition-colors hover:bg-blue-50"
                    >
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-md flex items-center justify-between gap-2 font-semibold leading-none heading-color"
                        >
                            Detail
                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                        </Typography>
                    </th>
                </tr>
            </thead>
            <tbody>
                {TABLE_ROWS.map(
                    ({ id, packageName, packageType, packageAddress }, index) => {


                        return (
                            <tr key={id}>
                                <td className="py-3 font-normal text-md pl-4">
                                    {id}
                                </td>
                                <td className="font-normal text-md pl-4">
                                    {packageName}
                                </td>
                                <td>
                                    <div className="font-normal text-md pl-4">
                                        {packageType}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-normal text-md pl-4">
                                        {packageAddress}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-medium text-md pl-4 cursor-pointer hover:underline">View Detail {'>>'}</div>
                                </td>
                            </tr>
                        );
                    },
                )}
            </tbody>
        </table>
    );
}

export default PackageTable;