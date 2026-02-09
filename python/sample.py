"""
Portfolio Data Manager
======================
Sample Python script demonstrating backend/data organization capabilities.
This can be used for processing portfolio data, managing projects, or API integration.

Author: Klint Vincent M. Lloren
Date: January 2026
"""

from datetime import datetime
from typing import List, Dict, Optional
import json


class Project:
    """Represents a portfolio project with metadata."""
    
    def __init__(
        self, 
        title: str, 
        description: str, 
        url: str, 
        tags: List[str],
        date_completed: Optional[str] = None
    ):
        self.title = title
        self.description = description
        self.url = url
        self.tags = tags
        self.date_completed = date_completed or datetime.now().strftime("%Y-%m-%d")
    
    def to_dict(self) -> Dict:
        """Convert project to dictionary format."""
        return {
            "title": self.title,
            "description": self.description,
            "url": self.url,
            "tags": self.tags,
            "date_completed": self.date_completed
        }
    
    def __repr__(self) -> str:
        return f"Project('{self.title}', tags={self.tags})"


class PortfolioManager:
    """Manages portfolio projects and achievements."""
    
    def __init__(self):
        self.projects: List[Project] = []
        self.achievements: List[Dict] = []
    
    def add_project(self, project: Project) -> None:
        """Add a new project to the portfolio."""
        self.projects.append(project)
        print(f"✓ Added project: {project.title}")
    
    def add_achievement(self, year: str, title: str, description: str) -> None:
        """Add a new achievement."""
        achievement = {
            "year": year,
            "title": title,
            "description": description
        }
        self.achievements.append(achievement)
        print(f"✓ Added achievement: {title}")
    
    def get_projects_by_tag(self, tag: str) -> List[Project]:
        """Filter projects by tag."""
        return [p for p in self.projects if tag.lower() in [t.lower() for t in p.tags]]
    
    def export_to_json(self, filename: str = "portfolio_data.json") -> None:
        """Export portfolio data to JSON file."""
        data = {
            "projects": [p.to_dict() for p in self.projects],
            "achievements": self.achievements,
            "last_updated": datetime.now().isoformat()
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"✓ Exported portfolio data to {filename}")
    
    def display_summary(self) -> None:
        """Display portfolio summary."""
        print("\n" + "="*50)
        print("PORTFOLIO SUMMARY")
        print("="*50)
        print(f"Total Projects: {len(self.projects)}")
        print(f"Total Achievements: {len(self.achievements)}")
        
        if self.projects:
            print("\nProjects:")
            for i, project in enumerate(self.projects, 1):
                print(f"  {i}. {project.title}")
                print(f"     Tags: {', '.join(project.tags)}")
        
        if self.achievements:
            print("\nAchievements:")
            for achievement in self.achievements:
                print(f"  • {achievement['year']}: {achievement['title']}")
        
        print("="*50 + "\n")


def main():
    """Main function demonstrating portfolio data management."""
    
    # Initialize portfolio manager
    portfolio = PortfolioManager()
    
    # Add sample project
    language_platform = Project(
        title="Language Learning Platform",
        description="Interactive web application for language learning with progressive content",
        url="https://cyph35.github.io/for-lang/",
        tags=["Web Development", "Education", "Interactive Design"],
        date_completed="2024-12-15"
    )
    portfolio.add_project(language_platform)
    
    # Add achievements
    portfolio.add_achievement(
        year="2025",
        title="Hack for Gov 2025",
        description="2nd Place — Government technology solution"
    )
    
    portfolio.add_achievement(
        year="2024",
        title="School Hackathon",
        description="1st Place — Creative problem-solving and implementation"
    )
    
    portfolio.add_achievement(
        year="2013-2024",
        title="Academic Excellence",
        description="Academic Achiever from Grade 1 through Grade 12"
    )
    
    # Display summary
    portfolio.display_summary()
    
    # Filter projects by tag
    web_projects = portfolio.get_projects_by_tag("Web Development")
    print(f"Web Development projects: {len(web_projects)}")
    
    # Export to JSON
    portfolio.export_to_json()


if __name__ == "__main__":
    main()