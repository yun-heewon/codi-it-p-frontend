import Image from "next/image";
import Link from "next/link";
import StockAlertPopover from "./StockAlertPopover";

interface ProfileProps {
  name: string;
  image: string;
  role: "BUYER" | "SELLER";
}

const getValidImageUrl = (url: string | null) => {
  if (!url) return "https://placehold.co/400.jpg?text=user";
  
  // URL 형식이 맞는지 체크 (http로 시작하는지)
  try {
    if (url.startsWith('http')) return url;
    // 로컬 public 폴더 경로인 경우 등 예외 처리
    if (url.startsWith('/')) return url; 
    
    // 이도 저도 아니면 기본 이미지
    return "https://placehold.co/400.jpg?text=user";
  } catch {
    return "https://placehold.co/400.jpg?text=user";
  }
};

export default function Profile({ name, image, role }: ProfileProps) {
  // const profileImgSrc = role === "BUYER" ? "/images/profile-buyer.png" : "/images/profile-seller.png";
  const roleText = role === "BUYER" ? "바이어" : "셀러";
  const href = role === "BUYER" ? "/buyer/mypage" : "/seller/stores";

  const profileImage = getValidImageUrl(image);
  return (
    <div className="flex items-center gap-5">
      <StockAlertPopover />
      <div className="bg-gray03 h-3 w-[1px]" />
      <Link
        href={href}
        className="flex cursor-pointer items-center gap-[10px]"
      >
        <Image
          className="h-10 w-10 rounded-full"
          src={profileImage}
          alt=""
          width={40}
          height={40}
        />
        <div className="text-black02 text-sm font-bold">{name}</div>
      </Link>
      <div className="bg-gray03 h-3 w-[1px]" />
      <div className="text-black02 text-sm">{roleText}</div>
    </div>
  );
}
