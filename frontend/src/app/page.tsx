import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PlatformSection from '@/components/PlatformSection';
import AITechnologySection from '@/components/AITechnologySection';
import SolutionsSection from '@/components/SolutionsSection';
import CustomersSection from '@/components/CustomersSection';
import ContactFooter from '@/components/ContactFooter';

// Interactive & visual components — lazy loaded
const FreightPredictor = dynamic(() => import('@/components/FreightPredictor'), { ssr: false });
const AIDataFlow = dynamic(() => import('@/components/AIDataFlow'), { ssr: false });
const ProductPreview = dynamic(() => import('@/components/ProductPreview'), { ssr: false });
const NationalGrid = dynamic(() => import('@/components/NationalGrid'), { ssr: false });
const RouteSimulator = dynamic(() => import('@/components/RouteSimulator'), { ssr: false });
const CarrierDashboard = dynamic(() => import('@/components/CarrierDashboard'), { ssr: false });
const EnterpriseSection = dynamic(() => import('@/components/EnterpriseSection'));
const DashboardSection = dynamic(() => import('@/components/DashboardSection'), { ssr: false });
const MaturityAssessment = dynamic(() => import('@/components/MaturityAssessment'), { ssr: false });
const FreightBenchmark = dynamic(() => import('@/components/FreightBenchmark'), { ssr: false });
const DelayPrediction = dynamic(() => import('@/components/DelayPrediction'), { ssr: false });
const ArchitectureSection = dynamic(() => import('@/components/ArchitectureSection'));
const InsightsSection = dynamic(() => import('@/components/InsightsSection'));
const CareersSection = dynamic(() => import('@/components/CareersSection'));
const AIAssistant = dynamic(() => import('@/components/AIAssistant'), { ssr: false });
const StickyCta = dynamic(() => import('@/components/StickyCta'), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FreightPredictor />
      <AIDataFlow />
      <PlatformSection />
      <AITechnologySection />
      <ProductPreview />
      <NationalGrid />
      <SolutionsSection />
      <DashboardSection />
      <RouteSimulator />
      <CarrierDashboard />
      <CustomersSection />
      <FreightBenchmark />
      <DelayPrediction />
      <MaturityAssessment />
      <ArchitectureSection />
      <EnterpriseSection />
      <InsightsSection />
      <CareersSection />
      <ContactFooter />
      <AIAssistant />
      <StickyCta />
    </main>
  );
}
