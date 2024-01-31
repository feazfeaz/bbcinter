import React, { useEffect, useState } from 'react';

function Component() {
    
    const [a,setA] = useState(1)

    useEffect(() => {
        // Một số logic thực thi khi component mount
        console.log('Component mounted');

        // Return một hàm để dọn dẹp khi component unmount
        return () => {
            console.log('Component unmounted');
            // Thực hiện các công việc dọn dẹp, ví dụ: gỡ sự kiện, huỷ các tài nguyên không còn cần thiết, vv.
        };
    }, [a]); // Dependency array rỗng để hook chỉ chạy một lần khi component mount

    return <div>Component</div>;
}

export default Component;