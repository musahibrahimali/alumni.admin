import React from 'react';
import Link from 'next/link';
import { Typography } from "@mui/material";

const CopyRight = () => {
    return (
        <>
            <Typography className="text-gray-700 dark:text-gray-200" variant="body2" align="center">
                {'Copyright © '}
                {/* change this link to redirect to required page (for now redirects to home page) */}
                <Link color="inherit" href="/">
                    Alumni
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </>
    );
}

export default CopyRight;
