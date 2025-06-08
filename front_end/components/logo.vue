<template>
   <div class="stacked-logo">
        <div class="truck-icon">
            <div class="truck-body"></div>
            <div class="truck-cab"></div>
            <div class="truck-wheel"></div>
            <div class="truck-wheel"></div>
        </div>
        <div class="connection-lines">
            <div class="connection-dot"></div>
            <div class="connection-line"></div>
            <div class="connection-dot"></div>
        </div>
        <div class="logo-text">TruckLink</div>
    </div>
</template>
   <style scoped>
        .logo-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }

        .logo-versions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            width: 100%;
            max-width: 1200px;
        }

        .logo-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .logo-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .logo-card h3 {
            margin: 0 0 20px 0;
            color: #1e40af;
            font-size: 18px;
            font-weight: bold;
        }

        /* Main Logo */
        .main-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
        }

        .truck-icon {
            width: 60px;
            height: 40px;
            position: relative;
        }

        .truck-body {
            width: 35px;
            height: 20px;
            background: linear-gradient(45deg, #ef4444, #dc2626);
            border-radius: 4px;
            position: absolute;
            top: 10px;
            left: 0;
            box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
        }

        .truck-cab {
            width: 20px;
            height: 25px;
            background: linear-gradient(45deg, #1e40af, #1d4ed8);
            border-radius: 4px 4px 2px 2px;
            position: absolute;
            top: 5px;
            right: 0;
            box-shadow: 0 2px 8px rgba(30, 64, 175, 0.3);
        }

        .truck-wheel {
            width: 8px;
            height: 8px;
            background: #374151;
            border-radius: 50%;
            position: absolute;
            top: 28px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .truck-wheel:first-of-type {
            left: 8px;
        }

        .truck-wheel:last-of-type {
            right: 5px;
        }

        .connection-lines {
            display: flex;
            align-items: center;
            gap: 8px;
            animation: pulse 2s infinite;
        }

        .connection-dot {
            width: 6px;
            height: 6px;
            background: #06b6d4;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }

        .connection-line {
            width: 20px;
            height: 2px;
            background: linear-gradient(90deg, #06b6d4, #0891b2);
            border-radius: 1px;
        }

        .logo-text {
            font-size: 32px;
            font-weight: bold;
            background: linear-gradient(45deg, #1e40af, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -1px;
        }

        /* Icon Only Version */
        .icon-only {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #1e40af 0%, #06b6d4 100%);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: 0 10px 25px rgba(30, 64, 175, 0.3);
        }

        .icon-only .truck-icon {
            filter: brightness(0) invert(1);
        }

       

        /* Stacked Version */
        .stacked-logo {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
        }

        .stacked-logo .logo-text {
            font-size: 24px;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
        }

        .download-info {
            background: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 15px;
            margin-top: 30px;
            text-align: center;
            max-width: 600px;
        }

        .download-info h2 {
            color: #1e40af;
            margin: 0 0 15px 0;
        }

        .download-info p {
            color: #64748b;
            margin: 10px 0;
            line-height: 1.6;
        }
    </style>