<template>
<div class="login-container">
    <div class="login-card">
        <h3 class="title">Fleet Admin Login</h3>

        <div class="input-group">
            <input type="email" v-model="email" placeholder=" " required />
            <label>Email</label>
        </div>

        <div class="input-group">
            <input type="password" v-model="password" placeholder=" " required />
            <label>Password</label>
        </div>

        <button type="button" @click="login" class="login-btn">Login</button>
    </div>
</div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        login() {
            if (this.email === "admin@fleet.com" && this.password === "123456") {
                localStorage.setItem("isAuth", "true");
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        name: "Admin User",
                        email: this.email
                    })
                );
                this.$router.replace("/dashboard");
            } else {
                alert("Invalid credentials");
            }
        }
    }
};
</script>

<style scoped>
/* Full-screen login container */
.login-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #007bff, #00c6ff);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

/* Centered login card */
.login-card {
    width: 340px;
    background: #fff;
    border-radius: 15px;
    padding: 40px 30px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.title {
    font-size: 24px;
    font-weight: 700;
    color: #007bff;
    margin-bottom: 30px;
}

/* Floating input fields */
.input-group {
    position: relative;
    margin-bottom: 25px;
}

.input-group input {
    width: 100%;
    padding: 12px 5px;
    border: none;
    border-bottom: 2px solid #ccc;
    background: transparent;
    font-size: 14px;
    transition: 0.3s;
}

.input-group input:focus {
    outline: none;
    border-bottom-color: #007bff;
}

.input-group label {
    position: absolute;
    left: 5px;
    top: 12px;
    font-size: 14px;
    color: #aaa;
    pointer-events: none;
    transition: 0.3s;
}

.input-group input:focus+label,
.input-group input:not(:placeholder-shown)+label {
    top: -10px;
    font-size: 12px;
    color: #007bff;
}

/* Login button */
.login-btn {
    width: 100%;
    padding: 12px 0;
    background: #007bff;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
}

.login-btn:hover {
    background: #0056b3;
}

/* Responsive */
@media (max-width: 400px) {
    .login-card {
        width: 90%;
        padding: 30px 20px;
    }
}
</style>
