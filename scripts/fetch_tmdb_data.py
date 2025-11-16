#!/usr/bin/env python3
"""
TMDB 数据获取脚本
获取 Flutter 应用需要的电影和电视剧数据
"""

import os
import json
import requests
import time
from datetime import datetime
from typing import Dict, List, Any, Optional

class TMDBDataFetcher:
    def __init__(self, api_key: str, access_token: str):
        self.api_key = api_key
        self.access_token = access_token
        self.base_url = "https://api.themoviedb.org/3"
        self.headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json;charset=utf-8"
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)
        
    def _make_request(self, endpoint: str, params: Dict[str, Any] = None) -> Optional[Dict[str, Any]]:
        """发起 API 请求"""
        url = f"{self.base_url}{endpoint}"
        default_params = {
            "api_key": self.api_key,
            "language": "zh-CN"
        }
        
        if params:
            default_params.update(params)
            
        try:
            print(f"正在请求: {endpoint}")
            response = self.session.get(url, params=default_params)
            response.raise_for_status()
            
            # API 限制：每秒最多40个请求
            time.sleep(0.025)
            
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"请求失败 {endpoint}: {e}")
            return None
    
    def get_trending_movies(self) -> List[Dict[str, Any]]:
        """获取今日热门电影"""
        data = self._make_request("/trending/movie/day")
        return data.get("results", []) if data else []
    
    def get_popular_movies(self) -> List[Dict[str, Any]]:
        """获取热门电影"""
        data = self._make_request("/movie/popular", {"region": "CN"})
        return data.get("results", []) if data else []
    
    def get_popular_tv_shows(self) -> List[Dict[str, Any]]:
        """获取热门电视剧"""
        data = self._make_request("/tv/popular")
        return data.get("results", []) if data else []
    
    def get_upcoming_movies(self) -> List[Dict[str, Any]]:
        """获取即将上映的电影"""
        data = self._make_request("/movie/upcoming", {"region": "CN"})
        return data.get("results", []) if data else []
    
    def get_chinese_movies(self) -> List[Dict[str, Any]]:
        """获取中国电影（通过搜索）"""
        # 搜索中国相关电影
        search_terms = ["中国", "华语", "香港", "台湾"]
        all_movies = []
        
        for term in search_terms:
            data = self._make_request("/search/movie", {
                "query": term,
                "include_adult": False
            })
            if data and data.get("results"):
                all_movies.extend(data["results"])
        
        # 去重并按评分排序
        unique_movies = {}
        for movie in all_movies:
            movie_id = movie.get("id")
            if movie_id and movie_id not in unique_movies:
                unique_movies[movie_id] = movie
        
        # 按评分排序，取前20个
        sorted_movies = sorted(
            unique_movies.values(),
            key=lambda x: x.get("vote_average", 0),
            reverse=True
        )
        
        return sorted_movies[:20]
    
    def get_top_rated_movies(self) -> List[Dict[str, Any]]:
        """获取高评分电影"""
        data = self._make_request("/movie/top_rated")
        return data.get("results", []) if data else []
    
    def get_top_rated_tv_shows(self) -> List[Dict[str, Any]]:
        """获取高评分电视剧"""
        data = self._make_request("/tv/top_rated")
        return data.get("results", []) if data else []
    
    def fetch_all_data(self) -> Dict[str, Any]:
        """获取所有数据"""
        print("开始获取 TMDB 数据...")
        
        data = {
            "last_updated": datetime.now().isoformat(),
            "trending_movies": self.get_trending_movies(),
            "popular_movies": self.get_popular_movies(),
            "popular_tv_shows": self.get_popular_tv_shows(),
            "upcoming_movies": self.get_upcoming_movies(),
            "chinese_movies": self.get_chinese_movies(),
            "top_rated_movies": self.get_top_rated_movies(),
            "top_rated_tv_shows": self.get_top_rated_tv_shows(),
        }
        
        # 统计信息
        stats = {}
        for key, value in data.items():
            if key != "last_updated" and isinstance(value, list):
                stats[key] = len(value)
        
        data["stats"] = stats
        
        print("数据获取完成:")
        for key, count in stats.items():
            print(f"  {key}: {count} 项")
        
        return data

def save_json_data(data: Dict[str, Any], file_path: str) -> None:
    """保存数据到 JSON 文件"""
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"数据已保存到: {file_path}")

def main():
    """主函数"""
    # 从环境变量获取 API 密钥
    api_key = os.getenv("TMDB_API_KEY")
    access_token = os.getenv("TMDB_ACCESS_TOKEN")
    
    if not api_key or not access_token:
        print("错误: 请设置 TMDB_API_KEY 和 TMDB_ACCESS_TOKEN 环境变量")
        print("你可以在 https://www.themoviedb.org/settings/api 获取 API 密钥")
        return
    
    # 创建数据获取器
    fetcher = TMDBDataFetcher(api_key, access_token)
    
    # 获取所有数据
    all_data = fetcher.fetch_all_data()
    
    # 保存完整数据
    save_json_data(all_data, "data/tmdb/tmdb_data.json")
    
    # 分别保存各类数据（便于按需加载）
    data_files = {
        "trending_movies.json": all_data["trending_movies"],
        "popular_movies.json": all_data["popular_movies"],
        "popular_tv_shows.json": all_data["popular_tv_shows"],
        "upcoming_movies.json": all_data["upcoming_movies"],
        "chinese_movies.json": all_data["chinese_movies"],
        "top_rated_movies.json": all_data["top_rated_movies"],
        "top_rated_tv_shows.json": all_data["top_rated_tv_shows"],
    }
    
    for filename, data in data_files.items():
        save_json_data(data, f"data/tmdb/{filename}")
    
    # 保存元数据
    metadata = {
        "last_updated": all_data["last_updated"],
        "stats": all_data["stats"],
        "api_info": {
            "base_url": "https://api.themoviedb.org/3",
            "image_base_url": "https://image.tmdb.org/t/p/",
            "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
            "backdrop_sizes": ["w300", "w780", "w1280", "original"]
        }
    }
    save_json_data(metadata, "data/tmdb/metadata.json")
    
    print("\n✅ 所有数据获取并保存完成!")

if __name__ == "__main__":
    main()
