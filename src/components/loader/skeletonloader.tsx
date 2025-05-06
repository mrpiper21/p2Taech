import { appTheme } from '../../constant/theme';

interface SkeletonLoaderProps {
  theme: "light" | "dark";
  cardCount?: number;
}

const SkeletonLoader = ({ theme, cardCount = 6 }: SkeletonLoaderProps) => {
  return (
    <div 
      className="p-6"
      style={{
        backgroundColor: appTheme[theme].surface.secondary,
        color: appTheme.text.primary,
      }}
    >
      {/* Header Skeleton */}
      <div 
        className="h-8 w-64 mb-8 rounded-md animate-pulse" 
        style={{ backgroundColor: appTheme[theme].neutral[200] }}
      ></div>
      
      {/* Search/Filters Skeleton */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div 
          className="h-12 flex-1 rounded-lg animate-pulse"
          style={{ backgroundColor: appTheme[theme].neutral[200] }}
        ></div>
        <div 
          className="h-12 w-40 rounded-lg animate-pulse"
          style={{ backgroundColor: appTheme[theme].neutral[200] }}
        ></div>
      </div>
      
      {/* Course Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(cardCount)].map((_, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden p-6 animate-pulse"
            style={{
              backgroundColor: appTheme[theme].surface.primary,
              boxShadow: appTheme.shadows.md,
            }}
          >
            <div className="flex flex-col h-full gap-4">
              {/* Course Title */}
              <div 
                className="h-6 w-3/4 rounded-md"
                style={{ backgroundColor: appTheme[theme].neutral[200] }}
              ></div>
              
              {/* Subject Title */}
              <div 
                className="h-5 w-1/2 rounded-md mb-4"
                style={{ backgroundColor: appTheme[theme].neutral[200] }}
              ></div>
              
              {/* Duration */}
              <div className="flex items-center gap-2 mb-6">
                <div 
                  className="h-5 w-5 rounded-full"
                  style={{ backgroundColor: appTheme[theme].neutral[200] }}
                ></div>
                <div 
                  className="h-4 w-16 rounded-md"
                  style={{ backgroundColor: appTheme[theme].neutral[200] }}
                ></div>
              </div>
              
              {/* Price & Button */}
              <div className="flex justify-between items-center mt-auto">
                <div 
                  className="h-6 w-16 rounded-md"
                  style={{ backgroundColor: appTheme[theme].neutral[200] }}
                ></div>
                <div 
                  className="h-10 w-24 rounded-lg"
                  style={{ backgroundColor: appTheme[theme].neutral[200] }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;