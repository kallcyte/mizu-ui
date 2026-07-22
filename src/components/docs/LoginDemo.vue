<script setup lang="ts">
import { ref } from "vue";
import { MizuSkeleton } from "@mizu/vue";

const proofPoints = [
  { value: "500+", label: "local professionals" },
  { value: "20+", label: "global offices across Asia" },
  { value: "10,000+", label: "projects delivered" },
];

const email = ref("");
const password = ref("");
const remember = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const errorMsg = ref("");
const successMsg = ref("");
let successTimer: ReturnType<typeof setTimeout> | null = null;

const emailError = ref("");
const passwordError = ref("");

function validateEmail() {
  emailError.value = email.value && !email.value.includes("@") ? "Enter a valid email." : "";
}

function validatePassword() {
  passwordError.value = password.value && password.value.length < 6 ? "At least 6 characters." : "";
}

function showSuccess(msg: string) {
  successMsg.value = msg;
  if (successTimer) clearTimeout(successTimer);
  successTimer = setTimeout(() => {
    successMsg.value = "";
    successTimer = null;
  }, 5000);
}

function handleSubmit() {
  errorMsg.value = "";
  validateEmail();
  validatePassword();
  if (emailError.value || passwordError.value) return;

  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    if (!email.value.includes("@")) {
      errorMsg.value = "Invalid email or password.";
    } else {
      console.log("[Mizu Login Demo] Signed in", {
        email: email.value,
        remember: remember.value,
      });
      showSuccess(`Signed in as ${email.value}. Redirecting to your dashboard…`);
    }
  }, 1200);
}
</script>

<template>
  <div class="grid min-h-screen grid-cols-1 lg:grid-cols-2">
    <!-- Left brand panel -->
    <aside
      class="relative hidden overflow-hidden text-foreground-inverse lg:flex lg:flex-col lg:justify-between bg-[radial-gradient(900px_600px_at_12%_8%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(700px_500px_at_90%_100%,rgba(99,168,255,0.18),transparent_65%),linear-gradient(180deg,#001C44_0%,#02142e_100%)] px-12 py-14"
    >
      <!-- Subtle grid overlay -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div class="relative z-10">
        <a href="https://hub.ycp.com" aria-label="YCP" class="inline-flex items-center text-foreground-inverse no-underline">
          <svg
            class="block h-7 w-auto lg:h-9 fill-current"
            viewBox="0 0 307 112"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23.0411 29.9491C22.2181 29.6405 21.8066 29.1261 21.8066 28.5088C21.8066 27.3772 25.1158 26.4513 28.665 26.7942C29.4655 24.7313 30.883 22.9656 32.7242 21.7382C34.5653 20.5107 36.7404 19.8813 38.9525 19.9359C41.3912 19.9961 43.7426 20.856 45.6448 22.3833C47.5469 23.9106 48.8945 26.0207 49.4801 28.3888C51.6405 27.4629 55.5498 27.1543 55.5498 27.9773C55.5498 28.3888 55.3612 28.5946 54.7439 29.0061C53.0535 29.9424 51.6498 31.3212 50.6832 32.9945C49.7166 34.6679 49.2237 36.5727 49.2572 38.5049C49.2572 43.7515 52.5664 48.1923 57.4187 48.1923C62.271 48.1923 65.6659 43.7515 65.6659 38.5049C65.7282 36.7033 65.2902 34.9196 64.4004 33.3518C63.5105 31.7841 62.2037 30.4935 60.625 29.6233C60.0077 29.2118 59.3905 28.8003 59.3905 28.3888C59.3905 27.0514 63.2997 27.2572 65.2544 27.9773C65.6752 25.879 66.8112 23.9919 68.4685 22.6379C70.1258 21.2839 72.2016 20.5471 74.3417 20.5531C76.5124 20.5886 78.5992 21.3972 80.2272 22.8334C81.8552 24.2697 82.9175 26.2395 83.2233 28.3888C84.6635 27.6687 89.1043 28.1831 89.1043 29.3147C89.1043 29.9319 88.2642 30.2406 87.3897 30.6521C79.7941 34.1841 58.7389 52.5474 58.7389 66.1612C58.7389 76.7917 67.3119 86.0676 71.324 87.525C72.6785 88.0394 72.8843 88.5538 72.8843 88.8624C72.8843 89.8911 70.1924 90.7142 66.9004 89.994C66.2308 92.2814 64.8325 94.2875 62.9182 95.7073C61.0038 97.1271 58.6782 97.8828 56.2949 97.8595C53.9117 97.8362 51.6012 97.0352 49.715 95.5783C47.8287 94.1214 46.4699 92.0883 45.8452 89.7883C42.416 90.4055 39.1412 90.0969 39.1412 88.9653C39.1412 88.5538 39.3469 88.1423 40.5814 87.6279C45.0222 85.7761 55.344 78.0262 55.344 66.3841C55.344 52.5474 35.9349 34.8014 23.0411 29.9491Z" />
            <path d="M1.95117 55.5307C1.95572 41.2761 7.62036 27.6066 17.6999 17.5271C27.7794 7.44751 41.4489 1.78287 55.7036 1.77832V1.77832C69.9612 1.77832 83.635 7.44096 93.7183 17.521C103.802 27.601 109.469 41.2731 109.473 55.5307V55.5307C109.473 69.7913 103.808 83.4678 93.7244 93.5516C83.6406 103.635 69.9641 109.3 55.7036 109.3V109.300C41.446 109.296 27.7739 103.629 17.6938 93.5455C7.61381 83.4622 1.95117 69.7883 1.95117 55.5307H1.95117ZM23.8979 23.7251C19.709 27.8934 16.3871 32.8501 14.1241 38.3091C11.861 43.7681 10.7016 49.6213 10.7127 55.5307V55.5307C10.7012 61.4428 11.8604 67.2987 14.1234 72.7605C16.3864 78.2223 19.7085 83.182 23.8979 87.3535V87.3535C28.0662 91.5425 33.023 94.8643 38.4819 97.1274C43.9409 99.3904 49.7941 100.55 55.7036 100.539V100.539C61.6159 100.552 67.4723 99.3938 72.9344 97.1307C78.3965 94.8675 83.356 91.5445 87.5263 87.3535V87.3535C91.7127 83.1798 95.0328 78.2196 97.2956 72.7583C99.5584 67.297 100.719 61.4423 100.712 55.5307V55.5307C100.719 49.6218 99.5577 43.7698 97.2949 38.3113C95.0321 32.8528 91.7122 27.8957 87.5263 23.7251V23.7251C83.356 19.5341 78.3965 16.2111 72.9344 13.9479C67.4723 11.6848 61.6159 10.5265 55.7036 10.5399V10.5399C49.7941 10.5288 43.9409 11.6882 38.4819 13.9512C33.023 16.2143 28.0662 19.5362 23.8979 23.7251V23.7251Z" />
            <path d="M181.309 24.6831C176.371 31.4019 170.965 39.6362 165.09 49.3862C161.777 54.8862 159.949 58.4019 159.605 59.9331C159.418 60.7456 159.324 61.9175 159.324 63.4487V68.0894C159.324 77.2456 159.605 82.3394 160.168 83.3706C160.418 83.8081 160.777 84.0894 161.246 84.2144C162.027 84.4331 163.949 84.6362 167.012 84.8237L167.48 85.2925V88.4331L167.012 88.9019C163.918 88.7144 159.105 88.6206 152.574 88.6206C145.887 88.6206 141.074 88.7144 138.137 88.9019L137.715 88.48V85.2925L138.184 84.8237C141.246 84.6362 143.168 84.4331 143.949 84.2144C144.418 84.0894 144.777 83.8081 145.027 83.3706C145.59 82.3394 145.871 77.2456 145.871 68.0894V62.5581C145.871 61.3706 143.418 56.6206 138.512 48.3081C133.512 39.8394 129.527 34.0894 126.559 31.0581C125.121 29.5894 124.152 28.7612 123.652 28.5737C123.152 28.355 121.98 28.2456 120.137 28.2456L119.621 27.73V25.105L120.09 24.5894C127.715 23.0894 132.605 22.0269 134.762 21.4019C136.387 22.1831 137.84 23.1987 139.121 24.4487C141.777 27.0425 145.34 32.8237 149.809 41.7925L155.949 54.0737C157.793 51.105 161.309 45.1362 166.496 36.1675L171.699 26.8394C172.262 25.8081 173.027 24.3862 173.996 22.5737H180.84L181.309 23.0425V24.6831ZM244.871 80.4175L242.715 85.1987C236.121 88.8237 228.746 90.6362 220.59 90.6362C204.277 90.6362 193.121 84.7612 187.121 73.0112C184.34 67.5737 182.949 61.6831 182.949 55.3394C182.949 45.0894 186.355 36.9175 193.168 30.8237C200.137 24.5425 209.652 21.4019 221.715 21.4019C229.371 21.4019 236.855 22.7925 244.168 25.5737L244.777 26.2769C243.715 30.5894 243.059 35.6362 242.809 41.4175L242.387 41.8862H239.621L239.152 41.3706C239.059 37.5894 238.887 34.9644 238.637 33.4956C234.73 29.0894 229.09 26.8862 221.715 26.8862C214.121 26.8862 208.168 29.2925 203.855 34.105C199.543 38.9175 197.387 45.4487 197.387 53.6987C197.387 64.855 201.23 73.4175 208.918 79.3862C213.012 82.5737 218.496 84.1675 225.371 84.1675C231.621 84.1675 237.73 82.5581 243.699 79.3394L244.871 80.4175ZM304.074 37.1519C304.074 43.5894 301.871 48.6206 297.465 52.2456C293.09 55.8394 288.137 57.6362 282.605 57.6362C280.73 57.6362 278.84 57.4175 276.934 56.98C276.652 56.1362 276.105 55.0112 275.293 53.605L276.277 52.5737C277.59 53.0112 278.793 53.23 279.887 53.23C283.043 53.23 285.574 52.1206 287.48 49.9019C289.387 47.6519 290.34 44.5112 290.34 40.48C290.34 31.7612 286.418 27.4019 278.574 27.4019C277.637 27.4019 275.762 27.5894 272.949 27.9644C272.668 28.7144 272.527 33.8237 272.527 43.2925V68.0894C272.527 75.5269 272.73 80.3706 273.137 82.6206C273.293 83.5269 273.824 84.105 274.73 84.355C275.012 84.4175 277.152 84.5737 281.152 84.8237L281.668 85.3394V88.4331L281.199 88.9019C276.918 88.7144 271.793 88.6206 265.824 88.6206C259.105 88.6206 254.293 88.7144 251.387 88.9019L250.918 88.48V85.3394L251.434 84.8237C254.59 84.6362 256.402 84.48 256.871 84.355C257.777 84.105 258.309 83.5269 258.465 82.6206C258.871 80.3706 259.074 75.5269 259.074 68.0894V43.2925C259.074 35.855 258.871 31.0112 258.465 28.7612C258.309 27.855 257.777 27.2769 256.871 27.0269C256.402 26.9019 254.574 26.7456 251.387 26.5581L250.918 26.0425V22.9487L251.434 22.48C254.496 22.6675 259.199 22.7612 265.543 22.7612C268.168 22.7612 271.949 22.7144 276.887 22.6206C281.824 22.5269 284.668 22.48 285.418 22.48C293.98 22.48 299.543 24.6519 302.105 28.9956C303.418 31.2456 304.074 33.9644 304.074 37.1519Z" />
          </svg>
        </a>
      </div>

      <div class="relative z-10 flex max-w-[440px] flex-col gap-5 self-start">
        <h1 class="m-0 text-[38px] leading-[1.1] font-bold tracking-[-0.02em] text-foreground-inverse">
          Strategy Delivered.<br />Across Asia and beyond.
        </h1>
        <p class="m-0 text-[15px] leading-6 text-foreground-inverse/70">
          We transform business challenges into opportunities by executing high-impact strategies
          that drive growth and lasting success.
        </p>

        <ul class="mt-2 flex flex-col gap-3 pl-0 list-none">
          <li
            v-for="pt in proofPoints"
            :key="pt.label"
            class="flex items-center gap-3 text-[14px] text-foreground-inverse/85"
          >
            <span class="inline-flex items-center justify-center size-[22px] rounded-full bg-white/10 text-foreground-inverse">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
                <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <span><strong>{{ pt.value }}</strong> {{ pt.label }}</span>
          </li>
        </ul>
      </div>

      <footer class="relative z-10 flex flex-wrap items-center gap-2.5 text-[12px] text-foreground-inverse/55">
        <span>© 2026 YCP Holdings (Global) Limited. All rights reserved.</span>
        <span class="opacity-50">·</span>
        <a href="https://hub.ycp.com" class="text-foreground-inverse/85 no-underline hover:text-foreground-inverse">hub.ycp.com</a>
      </footer>
    </aside>

    <!-- Right form panel -->
    <main class="flex items-center justify-center bg-surface-base px-6 py-14 text-foreground-primary lg:px-24">
      <div class="flex w-full max-w-[400px] flex-col gap-6">
        <!-- Mobile-only brand mark -->
        <a
          href="https://hub.ycp.com"
          aria-label="YCP"
          class="inline-flex items-center justify-center self-start text-brand-neutral no-underline lg:hidden"
        >
          <svg
            class="block h-7 w-auto fill-current"
            viewBox="0 0 307 112"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23.0411 29.9491C22.2181 29.6405 21.8066 29.1261 21.8066 28.5088C21.8066 27.3772 25.1158 26.4513 28.665 26.7942C29.4655 24.7313 30.883 22.9656 32.7242 21.7382C34.5653 20.5107 36.7404 19.8813 38.9525 19.9359C41.3912 19.9961 43.7426 20.856 45.6448 22.3833C47.5469 23.9106 48.8945 26.0207 49.4801 28.3888C51.6405 27.4629 55.5498 27.1543 55.5498 27.9773C55.5498 28.3888 55.3612 28.5946 54.7439 29.0061C53.0535 29.9424 51.6498 31.3212 50.6832 32.9945C49.7166 34.6679 49.2237 36.5727 49.2572 38.5049C49.2572 43.7515 52.5664 48.1923 57.4187 48.1923C62.271 48.1923 65.6659 43.7515 65.6659 38.5049C65.7282 36.7033 65.2902 34.9196 64.4004 33.3518C63.5105 31.7841 62.2037 30.4935 60.625 29.6233C60.0077 29.2118 59.3905 28.8003 59.3905 28.3888C59.3905 27.0514 63.2997 27.2572 65.2544 27.9773C65.6752 25.879 66.8112 23.9919 68.4685 22.6379C70.1258 21.2839 72.2016 20.5471 74.3417 20.5531C76.5124 20.5886 78.5992 21.3972 80.2272 22.8334C81.8552 24.2697 82.9175 26.2395 83.2233 28.3888C84.6635 27.6687 89.1043 28.1831 89.1043 29.3147C89.1043 29.9319 88.2642 30.2406 87.3897 30.6521C79.7941 34.1841 58.7389 52.5474 58.7389 66.1612C58.7389 76.7917 67.3119 86.0676 71.324 87.525C72.6785 88.0394 72.8843 88.5538 72.8843 88.8624C72.8843 89.8911 70.1924 90.7142 66.9004 89.994C66.2308 92.2814 64.8325 94.2875 62.9182 95.7073C61.0038 97.1271 58.6782 97.8828 56.2949 97.8595C53.9117 97.8362 51.6012 97.0352 49.715 95.5783C47.8287 94.1214 46.4699 92.0883 45.8452 89.7883C42.416 90.4055 39.1412 90.0969 39.1412 88.9653C39.1412 88.5538 39.3469 88.1423 40.5814 87.6279C45.0222 85.7761 55.344 78.0262 55.344 66.3841C55.344 52.5474 35.9349 34.8014 23.0411 29.9491Z" />
            <path d="M1.95117 55.5307C1.95572 41.2761 7.62036 27.6066 17.6999 17.5271C27.7794 7.44751 41.4489 1.78287 55.7036 1.77832V1.77832C69.9612 1.77832 83.635 7.44096 93.7183 17.521C103.802 27.601 109.469 41.2731 109.473 55.5307V55.5307C109.473 69.7913 103.808 83.4678 93.7244 93.5516C83.6406 103.635 69.9641 109.3 55.7036 109.3V109.300C41.446 109.296 27.7739 103.629 17.6938 93.5455C7.61381 83.4622 1.95117 69.7883 1.95117 55.5307H1.95117ZM23.8979 23.7251C19.709 27.8934 16.3871 32.8501 14.1241 38.3091C11.861 43.7681 10.7016 49.6213 10.7127 55.5307V55.5307C10.7012 61.4428 11.8604 67.2987 14.1234 72.7605C16.3864 78.2223 19.7085 83.182 23.8979 87.3535V87.3535C28.0662 91.5425 33.023 94.8643 38.4819 97.1274C43.9409 99.3904 49.7941 100.55 55.7036 100.539V100.539C61.6159 100.552 67.4723 99.3938 72.9344 97.1307C78.3965 94.8675 83.356 91.5445 87.5263 87.3535V87.3535C91.7127 83.1798 95.0328 78.2196 97.2956 72.7583C99.5584 67.297 100.719 61.4423 100.712 55.5307V55.5307C100.719 49.6218 99.5577 43.7698 97.2949 38.3113C95.0321 32.8528 91.7122 27.8957 87.5263 23.7251V23.7251C83.356 19.5341 78.3965 16.2111 72.9344 13.9479C67.4723 11.6848 61.6159 10.5265 55.7036 10.5399V10.5399C49.7941 10.5288 43.9409 11.6882 38.4819 13.9512C33.023 16.2143 28.0662 19.5362 23.8979 23.7251V23.7251Z" />
            <path d="M181.309 24.6831C176.371 31.4019 170.965 39.6362 165.09 49.3862C161.777 54.8862 159.949 58.4019 159.605 59.9331C159.418 60.7456 159.324 61.9175 159.324 63.4487V68.0894C159.324 77.2456 159.605 82.3394 160.168 83.3706C160.418 83.8081 160.777 84.0894 161.246 84.2144C162.027 84.4331 163.949 84.6362 167.012 84.8237L167.48 85.2925V88.4331L167.012 88.9019C163.918 88.7144 159.105 88.6206 152.574 88.6206C145.887 88.6206 141.074 88.7144 138.137 88.9019L137.715 88.48V85.2925L138.184 84.8237C141.246 84.6362 143.168 84.4331 143.949 84.2144C144.418 84.0894 144.777 83.8081 145.027 83.3706C145.59 82.3394 145.871 77.2456 145.871 68.0894V62.5581C145.871 61.3706 143.418 56.6206 138.512 48.3081C133.512 39.8394 129.527 34.0894 126.559 31.0581C125.121 29.5894 124.152 28.7612 123.652 28.5737C123.152 28.355 121.98 28.2456 120.137 28.2456L119.621 27.73V25.105L120.09 24.5894C127.715 23.0894 132.605 22.0269 134.762 21.4019C136.387 22.1831 137.84 23.1987 139.121 24.4487C141.777 27.0425 145.34 32.8237 149.809 41.7925L155.949 54.0737C157.793 51.105 161.309 45.1362 166.496 36.1675L171.699 26.8394C172.262 25.8081 173.027 24.3862 173.996 22.5737H180.84L181.309 23.0425V24.6831ZM244.871 80.4175L242.715 85.1987C236.121 88.8237 228.746 90.6362 220.59 90.6362C204.277 90.6362 193.121 84.7612 187.121 73.0112C184.34 67.5737 182.949 61.6831 182.949 55.3394C182.949 45.0894 186.355 36.9175 193.168 30.8237C200.137 24.5425 209.652 21.4019 221.715 21.4019C229.371 21.4019 236.855 22.7925 244.168 25.5737L244.777 26.2769C243.715 30.5894 243.059 35.6362 242.809 41.4175L242.387 41.8862H239.621L239.152 41.3706C239.059 37.5894 238.887 34.9644 238.637 33.4956C234.73 29.0894 229.09 26.8862 221.715 26.8862C214.121 26.8862 208.168 29.2925 203.855 34.105C199.543 38.9175 197.387 45.4487 197.387 53.6987C197.387 64.855 201.23 73.4175 208.918 79.3862C213.012 82.5737 218.496 84.1675 225.371 84.1675C231.621 84.1675 237.73 82.5581 243.699 79.3394L244.871 80.4175ZM304.074 37.1519C304.074 43.5894 301.871 48.6206 297.465 52.2456C293.09 55.8394 288.137 57.6362 282.605 57.6362C280.73 57.6362 278.84 57.4175 276.934 56.98C276.652 56.1362 276.105 55.0112 275.293 53.605L276.277 52.5737C277.59 53.0112 278.793 53.23 279.887 53.23C283.043 53.23 285.574 52.1206 287.48 49.9019C289.387 47.6519 290.34 44.5112 290.34 40.48C290.34 31.7612 286.418 27.4019 278.574 27.4019C277.637 27.4019 275.762 27.5894 272.949 27.9644C272.668 28.7144 272.527 33.8237 272.527 43.2925V68.0894C272.527 75.5269 272.73 80.3706 273.137 82.6206C273.293 83.5269 273.824 84.105 274.73 84.355C275.012 84.4175 277.152 84.5737 281.152 84.8237L281.668 85.3394V88.4331L281.199 88.9019C276.918 88.7144 271.793 88.6206 265.824 88.6206C259.105 88.6206 254.293 88.7144 251.387 88.9019L250.918 88.48V85.3394L251.434 84.8237C254.59 84.6362 256.402 84.48 256.871 84.355C257.777 84.105 258.309 83.5269 258.465 82.6206C258.871 80.3706 259.074 75.5269 259.074 68.0894V43.2925C259.074 35.855 258.871 31.0112 258.465 28.7612C258.309 27.855 257.777 27.2769 256.871 27.0269C256.402 26.9019 254.574 26.7456 251.387 26.5581L250.918 26.0425V22.9487L251.434 22.48C254.496 22.6675 259.199 22.7612 265.543 22.7612C268.168 22.7612 271.949 22.7144 276.887 22.6206C281.824 22.5269 284.668 22.48 285.418 22.48C293.98 22.48 299.543 24.6519 302.105 28.9956C303.418 31.2456 304.074 33.9644 304.074 37.1519Z" />
          </svg>
        </a>

        <header class="flex flex-col gap-2">
          <h2 class="m-0 text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-foreground-primary">
            Welcome back
          </h2>
          <p class="m-0 text-[14px] text-foreground-secondary">
            Sign in to continue working with the YCP team.
          </p>
        </header>

        <UAlert
          v-if="successMsg"
          color="success"
          variant="soft"
          :title="successMsg"
          icon="i-lucide-check-circle"
          class="-mb-2"
        />

        <UAlert
          v-if="errorMsg"
          color="error"
          variant="soft"
          :title="errorMsg"
          icon="i-lucide-alert-circle"
          class="-mb-2"
        />

        <form v-if="!loading" class="flex flex-col gap-4" @submit.prevent="handleSubmit">
          <UFormField label="Email" required :error="emailError || undefined" class="w-full">
            <UInput
              v-model="email"
              type="email"
              placeholder="you@company.com"
              icon="i-lucide-mail"
              autocomplete="email"
              class="w-full"
              @update:model-value="validateEmail"
            />
          </UFormField>

          <UFormField label="Password" required :error="passwordError || undefined" class="w-full">
            <UInput
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              icon="i-lucide-lock"
              autocomplete="current-password"
              class="w-full"
              @update:model-value="validatePassword"
            >
              <template #trailing>
                <UButton
                  type="button"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  @click="showPassword = !showPassword"
                />
              </template>
            </UInput>
          </UFormField>

          <div class="flex items-center justify-between">
            <UCheckbox v-model="remember" label="Keep me signed in" />
            <a href="#" class="text-[13px] text-brand-primary no-underline hover:underline">
              Reset password
            </a>
          </div>

          <UButton type="submit" color="primary" size="lg" block label="Sign in to YCP Hub" />

          <USeparator label="OR" class="my-1" />

          <UButton
            color="neutral"
            variant="outline"
            size="lg"
            block
            label="Login with Microsoft Account"
          >
            <template #leading>
              <svg
                class="block shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 23 23"
                aria-hidden="true"
              >
                <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
                <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
                <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
              </svg>
            </template>
          </UButton>

          <p class="mt-1 text-center text-[13px] text-foreground-secondary">
            Don&rsquo;t have a YCP Hub account?
            <a
              href="https://hub.ycp.com/contact"
              class="font-semibold text-brand-primary no-underline hover:underline"
            >
              Contact your engagement lead
            </a>
          </p>
        </form>

        <!-- Skeleton loading state — uses the Mizu component -->
        <div v-else class="flex flex-col gap-2" aria-busy="true" aria-live="polite">
          <MizuSkeleton class="block h-3 w-2/5 rounded-sm" />
          <MizuSkeleton class="block h-10 w-full rounded-lg" />
          <div class="h-3" />
          <MizuSkeleton class="block h-3 w-2/5 rounded-sm" />
          <MizuSkeleton class="block h-10 w-full rounded-lg" />
          <div class="h-3" />
          <MizuSkeleton class="block h-[18px] w-3/5 rounded-sm" />
          <div class="h-3" />
          <MizuSkeleton class="block h-11 w-full rounded-lg" />
          <p class="mt-3 text-center text-[12px] text-foreground-tertiary">
            Signing you in&hellip;
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Reserved for any demo-specific overrides Tailwind can't cover. */
</style>
