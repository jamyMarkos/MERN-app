import { useEffect, useState } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:4000/api/workouts"
                );
                if (!response.ok) {
                    throw new Error(
                        "Request failed with status " + response.status
                    );
                }
                /* 
                // - checks if res is valid JSON by checking the content-type!!!
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Response is not valid JSON");
                } 
                */
                const data = await response.json();
                setWorkouts(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchWorkouts();
    }, []);

    return (
        <div className="home">
            <div className="workouts">
                {workouts &&
                    workouts.map((workout) => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))}
            </div>
            <WorkoutForm />
        </div>
    );
};

export default Home;
