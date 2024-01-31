// components/InfiniteScroll.tsx
import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography } from '@mui/material';

interface InfiniteScrollProps {
    fetchMore: () => void;
    hasMore: boolean;
    isLoading: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
    children, // just for display data
    fetchMore, // callback to call when 
    hasMore,
    isLoading, // to know loading/fecting is finish or not 
}) => {
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            if (!hasMore || isLoading || isFetching) return;

            const scrollTop =
                (document.documentElement && document.documentElement.scrollTop) ||
                document.body.scrollTop;

            const scrollHeight =
                (document.documentElement && document.documentElement.scrollHeight) ||
                document.body.scrollHeight;

            const clientHeight =
                (document.documentElement && document.documentElement.clientHeight) ||
                window.innerHeight;

            const thresholdDistance = 1000;
            const scrolledToBottom = Math.ceil(scrollTop + clientHeight + thresholdDistance) >= scrollHeight;

            if (scrolledToBottom) {
                setIsFetching(true);
                fetchMore();
            }
        };
        // will trigger when user scroll
        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, isLoading, isFetching, fetchMore]);

    useEffect(() => {
        if (!isLoading && isFetching) {
            setIsFetching(false);
        }
    }, [isLoading, isFetching]);

    return (
        <>

            {children}

            {isFetching && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <CircularProgress size={24} />
                </div>
            )}

            {!hasMore && !isLoading && (
                <Typography variant="body2" align="center">
                    No more items to load.
                </Typography>
            )}

        </>
    );
};

export default InfiniteScroll;
