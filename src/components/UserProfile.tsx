import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import { User } from '../types/user';


interface UserProfileProps {
    userData: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
    const user: User = JSON.parse(decodeURIComponent(userData));
    return (
        <Card className="w-96 mx-auto flex flex-col items-center">
            <CardHeader floated={false} className="h-30">
                <img src={user.picture.large} alt={user.name.first} />
            </CardHeader>
            <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    {`${user.name.title} ${user.name.first} ${user.name.last}`}
                </Typography>
                <Typography color="blue-gray" className="font-medium" textGradient>
                    {user.email}
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
                <Tooltip content="Gender">
                    <Typography
                        as="a"
                        variant="lead"
                        color="blue"
                        textGradient
                    >
                        {user.gender}
                    </Typography>
                </Tooltip>
                <Tooltip content="Phone">
                    <Typography
                        as="a"
                        variant="lead"
                        color="light-blue"
                        textGradient
                    >
                        {user.phone}
                    </Typography>
                </Tooltip>
                <Tooltip content="Country">
                    <Typography
                        as="a"
                        variant="lead"
                        color="purple"
                        textGradient
                    >
                        {user.location.country}
                    </Typography>
                </Tooltip>
            </CardFooter>
        </Card>
    );
};

export default UserProfile;
