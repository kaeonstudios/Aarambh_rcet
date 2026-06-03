# Hidden Files & Restore Guide

To hide the admin dashboard routes and the self-hosted survey registration modal, we have deactivated and renamed these files. This document details what was changed and provides instructions to restore them to their active state.

---

## Hidden Assets Summary

### 1. Admin Section Frontend Pages
To prevent standard users from accessing `/admin/login` and `/admin/dashboard`, the frontend pages and layouts inside `app/admin` have been renamed to `_hidden` versions. Because Next.js matches routes based on `page.tsx` and `layout.tsx` files, renaming them renders these routes inactive (returning a `404 Not Found` error).
- **Dashboard**: `app/admin/dashboard/page.tsx` ──> `app/admin/dashboard/page_hidden.tsx`
- **Login**: `app/admin/login/page.tsx` ──> `app/admin/login/page_hidden.tsx`
- **Layout**: `app/admin/layout.tsx` ──> `app/admin/layout_hidden.tsx`

Additionally, the access entry points (the Shield icon on desktop and "Admin Access" link on mobile menu) have been commented out in `components/Navbar.tsx`.

### 2. Self-Hosted Registration Modal (Survey Form)
The self-hosted registration modal has been deactivated and replaced with a direct link opening a Google Form in a new tab.
- **Registration Component**: `components/RegistrationModal.tsx` ──> `components/RegistrationModal_hidden.tsx`

---

## How to Reappear/Restore Hidden Sections

Follow these steps to restore the hidden features.

### Step 1: Rename Files Back to Original
Ensure your local Next.js dev server is stopped (to prevent lock issues on windows) and execute the following PowerShell commands in the project root:

```powershell
# Restore Admin Frontend Pages
Rename-Item -Path "app/admin/dashboard/page_hidden.tsx" -NewName "page.tsx"
Rename-Item -Path "app/admin/login/page_hidden.tsx" -NewName "page.tsx"
Rename-Item -Path "app/admin/layout_hidden.tsx" -NewName "layout.tsx"

# Restore Registration Modal
Rename-Item -Path "components/RegistrationModal_hidden.tsx" -NewName "RegistrationModal.tsx"
```

*(Alternatively, you can manually rename these files using your file explorer or code editor).*

### Step 2: Restore UI Entry Points & Imports
1. **Uncomment Admin Buttons in Navbar**:
   Open [Navbar.tsx](file:///c:/Development%20Projects/Aarambh%20Hub%20Antigravity/components/Navbar.tsx) and look for the commented out code matching `Admin Shield Button Hidden` and `Admin Access Mobile Link Hidden`. Uncomment these tags to make the admin dashboard links visible again.

2. **Restore Self-Hosted Modal in Hero & Navbar**:
   - Re-import `RegistrationModal` in [Hero.tsx](file:///c:/Development%20Projects/Aarambh%20Hub%20Antigravity/components/Hero.tsx) and [Navbar.tsx](file:///c:/Development%20Projects/Aarambh%20Hub%20Antigravity/components/Navbar.tsx):
     `import RegistrationModal from "./RegistrationModal";`
   - Re-enable the state `const [isApplyOpen, setIsApplyOpen] = useState(false);` and replace the button `onClick` redirects with `setIsApplyOpen(true)`.
   - Render the `<RegistrationModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />` component back at the bottom of `Hero.tsx` and `Navbar.tsx`.
