import React from 'react';

function Dashboard() {
    return (
        <div style={styles.container}>
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard! This content is visible after login.</p>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
};

export default Dashboard;
