// Login component
import {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", {email, password});
      localStorage.setItem("token", response.data.token);
      history.push("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

// Post component
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts", {
          headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
        });
        setPosts(response.data);
      } catch (error) {
        history.push("/login");
      }
    };
    fetchPosts();
  }, [history]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

// Backend middleware
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({message: "Authorization token not found"});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({message: "Invalid authorization token"});
  }
};

app.get("/api/posts", authenticate, (req, res) => {
  // Get all posts logic here
});
