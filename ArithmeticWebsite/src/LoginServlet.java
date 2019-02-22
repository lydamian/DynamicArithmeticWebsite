

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import com.google.gson.Gson;
import com.google.gson.JsonObject;


/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	@Resource(name = "jdbc/MathDB")
	private DataSource dataSource;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		//local variables
		Connection conn = null;
		boolean status = false;
		String firstname = null;
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		System.out.println("username: " + username + " , " + "password is: " + password);
		
		
		//verify that the username and password are in the database
		try {
			conn = dataSource.getConnection();
            Statement statement = conn.createStatement();
            String sql = "select email, password,firstname from mathuser";
            ResultSet rs = statement.executeQuery(sql);
             
            int count = 1;
            while (rs.next()) {
            	System.out.println(rs.getString("email") + " " + rs.getString("password"));
                if((rs.getString("email").equals(username) && (rs.getString("password").equals(password)))) {
                	status = true;
                	firstname = rs.getString("firstname");
                	break;
                }
            }
        } catch (SQLException ex) {
            System.err.println(ex);
        }
		
		Gson gson = new Gson();
		
		if(status == true) {
			System.out.println("Correct login entered for: " + username + " with a password of: " + password);
			// set this user into the session
            //request.getSession().setAttribute("user", new User(username, rsId));

            JsonObject responseJsonObject = new JsonObject();
            responseJsonObject.addProperty("firstname", firstname);
            responseJsonObject.addProperty("status", "success");
            responseJsonObject.addProperty("message", "success");
            responseJsonObject.addProperty("email", username);

            System.out.println(responseJsonObject.toString());
            response.getWriter().write(responseJsonObject.toString());

			try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}		
		else {
            JsonObject responseJsonObject = new JsonObject();
            responseJsonObject.addProperty("username", username);
            responseJsonObject.addProperty("status", "failure");
            responseJsonObject.addProperty("message", "failure");

            //System.out.println(responseJsonObject.toString());
            response.getWriter().write(responseJsonObject.toString());
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
		// return a valid status.
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
		
		
		
		
	}

}
