import React, { useState, useEffect } from 'react';
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useNavigate, Outlet } from 'react-router-dom';
import {
    Card,
    CardHeader,
    Input,
    Typography,
    CardBody,
    Avatar,
    IconButton,
    Tooltip,
    Select,
    Option,
    CardFooter,
    Button
} from "@material-tailwind/react";
import { fetchUsers } from '../service/userService';
import { User } from '../types/user';
import { LISTING } from '../constants/constants';

interface ListingProps {
}

const Listing: React.FC<ListingProps> = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [genderFilter, setGenderFilter] = useState<string | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const resultsPerPage = LISTING.RESULTS_PER_PAGE; // Adjust this value based on your API response
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from API and set it to the state
        const fetchData = async () => {
            try {
                const data = await fetchUsers();
                if (data) {
                    setUsers(data.results);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Run only once on component mount

    useEffect(() => {
        // Apply filters based on gender and search term
        let filteredData = users;

        if (genderFilter) {
            console.log("genderFilter", genderFilter);
            filteredData = filteredData.filter((user) => user.gender === genderFilter);
        }

        if (searchTerm) {
            console.log("searchTerm", searchTerm);
            filteredData = filteredData.filter((user) =>
                `${user.name.title} ${user.name.first} ${user.name.last}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }

        setFilteredUsers(filteredData);
    }, [users, genderFilter, searchTerm]); // Update on changes to users, genderFilter, or searchTerm

    // Calculate the range of users to display on the current page
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredUsers.length / resultsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handleEditUser = (user: User) => {
        return function() {
            navigate(`/user-profile/${encodeURIComponent(JSON.stringify(user))}`);
        }
    };

    return (
        <div>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Employees list
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all employees
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                        <div className="w-full md:w-72">
                            <Select
                                label="Select Gender"
                                value={genderFilter}
                                onChange={(val) => setGenderFilter(val)}
                                className="w-full"
                            >
                                <Option value="">All</Option>
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                            </Select>
                        </div>
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                crossOrigin={undefined}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {LISTING.TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            {head}{" "}
                                            {index !== LISTING.TABLE_HEAD.length - 1 && (
                                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map(
                                ({ picture, name, email, gender, phone, login }, index) => {
                                    const isLast = index === users.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={login.uuid}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={picture.thumbnail} alt='user-img' size="sm" />
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {name.title} {name.first} {name.last}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {email}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {gender}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {email}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {phone}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="Edit User">
                                                    <IconButton variant="text" onClick={handleEditUser(currentUsers[index])}>
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page {currentPage} of {totalPages}
                    </Typography>
                    <div className="flex gap-2">
                        <Button onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            variant="outlined" size="sm">
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm" onClick={handleNextPage}
                            disabled={currentPage === totalPages}>
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            <Outlet />
        </div>
    );
};

export default Listing;
