import { useState } from "react";

const WorkoutForm = () => {
    const [title, setTitle] = useState("");
    const [reps, setReps] = useState("");
    const [load, setLoad] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = { title, reps, load };

        const res = await fetch("http://localhost:4000/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();

        if (!res.ok) {
            setError(data.error);
        } else {
            setTitle("");
            setReps("");
            setLoad("");
            setError(null);
            console.log("new workout added", data);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>Reps: </label>
            <input
                type="text"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />
            <label>Load (in Kg)</label>
            <input
                type="text"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default WorkoutForm;
