import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import Papa from 'papaparse';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const StatsContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 30px;
  width: 100%;
  max-width: 1200px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  margin-top: 20px;
`;

const StatsTitle = styled(motion.h2)`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 
    0 0 10px rgba(255, 255, 255, 0.8),
    0 0 20px rgba(255, 105, 180, 0.6),
    0 0 30px rgba(255, 20, 147, 0.4);
  letter-spacing: 2px;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const ChartContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #ff69b4;
`;

const ChartTitle = styled.h3`
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 15px;
  text-align: center;
  font-family: 'Fredoka', cursive;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(45deg, #ff69b4, #ff1493);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(255, 105, 180, 0.6);
  }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #fff;
  font-size: 1.2rem;
  font-family: 'Fredoka', cursive;
`;

const CatStats = ({ isOpen, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Chart color scheme matching the theme
  const colors = {
    primary: '#ff69b4',    // Hot pink
    secondary: '#ff8c00',  // Orange
    accent: '#00bfff',     // Blue
    light: '#ffb6c1',      // Light pink
    dark: '#ff1493',       // Deep pink
    blue: '#1e90ff',       // Dodger blue
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Fetch data from backend API
      const response = await fetch('/cat-stats');
      const result = await response.json();
      
      if (result.success) {
        setData({ 
          globalData: result.global_stats, 
          countryStats: result.country_stats 
        });
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to hardcoded data if API fails
      const csvData = `Year,Estimated_Global_Cats,Estimated_Pet_Cats,Number_of_Households,Cats_per_Household,Cats_in_Shelters_Intake,Cats_Adopted_From_Shelters,Adoption_Fee_USD
2015,600000000,300000000,1500000000,0.20,2000000,1200000,50
2016,620000000,310000000,1520000000,0.205,2100000,1300000,55
2017,640000000,320000000,1540000000,0.208,2200000,1350000,60
2018,660000000,330000000,1560000000,0.212,2300000,1400000,65
2019,680000000,340000000,1580000000,0.215,2400000,1450000,70
2020,700000000,350000000,1600000000,0.219,2500000,1500000,75
2021,720000000,360000000,1620000000,0.222,2600000,1550000,80
2022,740000000,370000000,1640000000,0.226,2700000,1600000,90
2023,760000000,380000000,1660000000,0.229,2800000,1650000,100
2024,780000000,390000000,1680000000,0.232,2900000,1700000,120
2025,800000000,400000000,1700000000,0.235,3000000,1750000,150`;

      const countryData = `Country,Estimated_Cats_millions
United States,74.1
China,53.1
Russia,23.1
Germany,15.2
France,14.9
Brazil,22.1
Australia,5.3
United Kingdom,12.0`;

      const globalData = Papa.parse(csvData, { header: true }).data;
      const countryStats = Papa.parse(countryData, { header: true }).data;
      
      setData({ globalData, countryStats });
    } finally {
      setLoading(false);
    }
  };

  const pieChartData = {
    labels: data?.countryStats?.map(row => row.Country) || [],
    datasets: [
      {
        data: data?.countryStats?.map(row => parseFloat(row.Estimated_Cats_millions)) || [],
        backgroundColor: [
          colors.primary,
          colors.secondary,
          colors.accent,
          colors.light,
          colors.dark,
          colors.blue,
          '#ffa500',
          '#ff6347',
        ],
        borderColor: '#fff',
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const stackedBarData = {
    labels: data?.globalData?.slice(0, 6).map(row => row.Year) || [],
    datasets: [
      {
        label: 'Pet Cats (millions)',
        data: data?.globalData?.slice(0, 6).map(row => parseInt(row.Estimated_Pet_Cats) / 1000000) || [],
        backgroundColor: colors.primary,
        borderColor: colors.dark,
        borderWidth: 1,
      },
      {
        label: 'Households (millions)',
        data: data?.globalData?.slice(0, 6).map(row => parseInt(row.Number_of_Households) / 1000000) || [],
        backgroundColor: colors.secondary,
        borderColor: '#ff8c00',
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: data?.globalData?.map(row => row.Year) || [],
    datasets: [
      {
        label: 'Shelter Intake (millions)',
        data: data?.globalData?.map(row => parseInt(row.Cats_in_Shelters_Intake) / 1000000) || [],
        borderColor: colors.accent,
        backgroundColor: `${colors.accent}20`,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Adoptions (millions)',
        data: data?.globalData?.map(row => parseInt(row.Cats_Adopted_From_Shelters) / 1000000) || [],
        borderColor: colors.primary,
        backgroundColor: `${colors.primary}20`,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const adoptionFeeData = {
    labels: data?.globalData?.map(row => row.Year) || [],
    datasets: [
      {
        label: 'Average Adoption Fee (USD)',
        data: data?.globalData?.map(row => parseInt(row.Adoption_Fee_USD)) || [],
        borderColor: colors.blue,
        backgroundColor: `${colors.blue}20`,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const catsPerHouseholdData = {
    labels: data?.globalData?.slice(-6).map(row => row.Year) || [],
    datasets: [
      {
        label: 'Cats per Household',
        data: data?.globalData?.slice(-6).map(row => parseFloat(row.Cats_per_Household)) || [],
        backgroundColor: [
          colors.primary,
          colors.secondary,
          colors.accent,
          colors.light,
          colors.dark,
          colors.blue,
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Fredoka, cursive',
            size: 12,
          },
          color: '#333',
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: 'Fredoka, cursive',
          },
          color: '#333',
        },
        grid: {
          color: 'rgba(0,0,0,0.1)',
        },
      },
      x: {
        ticks: {
          font: {
            family: 'Fredoka, cursive',
          },
          color: '#333',
        },
        grid: {
          color: 'rgba(0,0,0,0.1)',
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            family: 'Fredoka, cursive',
            size: 11,
          },
          color: '#333',
        },
      },
    },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <StatsContainer
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'relative' }}
      >
        <CloseButton
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ×
        </CloseButton>

        <StatsTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🐱 Cat Statistics Dashboard 🐱
        </StatsTitle>

        {loading ? (
          <LoadingContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading cat statistics...
          </LoadingContainer>
        ) : (
          <ChartsGrid>
            <ChartContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ChartTitle>🐾 Cats per Country (2025)</ChartTitle>
              <Pie data={pieChartData} options={pieChartOptions} />
            </ChartContainer>

            <ChartContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ChartTitle>🏠 Pet Cats vs Households</ChartTitle>
              <Bar data={stackedBarData} options={chartOptions} />
            </ChartContainer>

            <ChartContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <ChartTitle>🏥 Shelter Intake vs Adoptions</ChartTitle>
              <Line data={lineChartData} options={chartOptions} />
            </ChartContainer>

            <ChartContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <ChartTitle>💰 Average Adoption Fees</ChartTitle>
              <Line data={adoptionFeeData} options={chartOptions} />
            </ChartContainer>

            <ChartContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <ChartTitle>🏠 Cats per Household Trend</ChartTitle>
              <Bar data={catsPerHouseholdData} options={chartOptions} />
            </ChartContainer>
          </ChartsGrid>
        )}
      </StatsContainer>
    </AnimatePresence>
  );
};

export default CatStats;
