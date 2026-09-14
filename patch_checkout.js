const fs = require('fs');
const path = '/Users/macbookair/Desktop/CodeGrid/codegrid/src/app/(front)/main/checkout/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add new state variables
content = content.replace(
  'const [loading, setLoading] = useState(false);',
  `const [loading, setLoading] = useState(false);\n  const [orderSuccessUser, setOrderSuccessUser] = useState<{id: number, email: string} | null>(null);\n  const [newPassword, setNewPassword] = useState("");\n  const [settingPassword, setSettingPassword] = useState(false);`
);

// Add API imports
content = content.replace(
  'import { createIncompleteOrder, updateIncompleteOrder, deleteIncompleteOrder } from "@/api/incompleteOrderApi";',
  `import { createIncompleteOrder, updateIncompleteOrder, deleteIncompleteOrder } from "@/api/incompleteOrderApi";\nimport { updateUser } from "@/api/userApi";\nimport { loginUser } from "@/api/authApi";`
);

// Modify handleSubmit
const handleSubmitOld = `      if (res) {
        if (incompleteOrderIdRef.current) {
          try {
            await deleteIncompleteOrder(incompleteOrderIdRef.current);
          } catch (e) {
            console.error("Failed to clear incomplete order", e);
          }
        }
        alert("Order placed successfully!");
        clearCart();
        router.push("/main/shop");
      }`;

const handleSubmitNew = `      if (res) {
        if (incompleteOrderIdRef.current) {
          try {
            await deleteIncompleteOrder(incompleteOrderIdRef.current);
          } catch (e) {
            console.error("Failed to clear incomplete order", e);
          }
        }
        
        const isGuestCheckout = !localStorage.getItem("user");
        if (isGuestCheckout && res.data?.user?.id && formData.email) {
          setOrderSuccessUser({ id: res.data.user.id, email: formData.email });
          clearCart();
          return;
        }

        alert("Order placed successfully!");
        clearCart();
        router.push("/main/shop");
      }`;
content = content.replace(handleSubmitOld, handleSubmitNew);

// Add handleSetPassword function
const handleSetPasswordFunc = `
  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderSuccessUser || !newPassword) return;
    
    try {
      setSettingPassword(true);
      // Update the user's password
      await updateUser(orderSuccessUser.id, { password: newPassword });
      
      // Log them in
      await loginUser({ email: orderSuccessUser.email, password: newPassword });
      
      alert("Password set successfully! Redirecting to dashboard...");
      window.location.href = "/dashboard"; // Navigate and force reload to update auth state
    } catch (error) {
      console.error("Failed to set password:", error);
      alert("Failed to set password. You can try resetting it later.");
      router.push("/main/shop");
    } finally {
      setSettingPassword(false);
    }
  };

`;

content = content.replace('const shippingOptions = [', handleSetPasswordFunc + 'const shippingOptions = [');

// Add conditional rendering for the success screen
const returnStatement = `  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">`;

const returnWithConditional = `  if (orderSuccessUser) {
    return (
      <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border-[1px] border-gray-100 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6 text-sm">
            We've created an account for you with the email <strong>{orderSuccessUser.email}</strong>. 
            Set a password below to track your orders and manage your account.
          </p>
          
          <form onSubmit={handleSetPassword} className="flex flex-col gap-4 text-left">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border-[1px] border-gray-300 p-3 text-sm rounded-md focus:border-black outline-none transition-colors"
                placeholder="Enter a secure password"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={settingPassword}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {settingPassword ? "Setting Password..." : "Set Password & Go to Dashboard"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/main/shop")}
              className="w-full bg-gray-100 text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors mt-2"
            >
              Skip for now
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">`;

content = content.replace(returnStatement, returnWithConditional);

fs.writeFileSync(path, content, 'utf8');
